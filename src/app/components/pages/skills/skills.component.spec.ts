import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { LanguageService } from '@path-services/language.service';
import { DataService } from '@path-services/data-service';
import { SkillsComponent } from './skills.component';

describe('SkillsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent],
      providers: [provideZonelessChangeDetection(), provideHttpClient(withXhr()), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should render one card per skill group with translated titles', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    const groups = TestBed.inject(DataService).getSkillGroups();
    const httpMock = TestBed.inject(HttpTestingController);
    const groupTitles = Object.fromEntries(groups.map(g => [g.id, `Grupo ${g.id}`]));
    httpMock.expectOne('/assets/i18n/pt-BR.json').flush({
      skills: { title: 'Skills', subtitle: 'Sub', groups: groupTitles },
    });
    httpMock.expectOne('/assets/i18n/en-US.json').flush({ skills: {} });
    TestBed.inject(LanguageService).setLanguage('pt-BR');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('#skills')).toBeTruthy();
    expect(el.querySelectorAll('.card').length).toBe(groups.length);
    expect(el.querySelector('.card-title')?.textContent?.trim()).toBe(`Grupo ${groups[0].id}`);
    expect(el.querySelectorAll('.badge').length).toBe(groups.reduce((n, g) => n + g.skills.length, 0));
  });
});
