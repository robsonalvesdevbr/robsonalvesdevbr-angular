import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PublishNameEnum } from '@path-app/models/PublishNameEnum';
import { FilterPipe } from '@path-pipes/filter.pipe';
import { ImgcursoPipe } from '@path-pipes/imgcurso.pipe';
import { MessageDateConclusionPipe } from '@path-pipes/message-date-conclusion.pipe';
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe';
import { SortbyPipe } from '@path-pipes/sortby.pipe';
import { DataService } from '@path-services/data-service';
import { NgxPaginationModule } from 'ngx-pagination';
import { BookComponent } from './book.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let dataServiceStub: Partial<DataService>;

  beforeEach(async () => {
    dataServiceStub = {
      getBooks: () => [
        {
          id: 'livro-inteligencia-artificial-chatgpt-1-altabooks-2023',
          title: 'Inteligência Artificial e ChatGPT 1',
          subtitle:
            'Da revolução dos modelos de IA generativa à Engenharia de Prompt',
          author: ['Fabrício Carraro'],
          publishName: PublishNameEnum.AltaBooks,
          publishYear: 2023,
          tags: ['Tag1', 'Tag2'],
          bookUrl:
            'https://www.casadocodigo.com.br/pages/sumario-inteligencia-artificial-chatgpt',
          pages: 223,
          progress: 100,
          favorite: false,
        },
        {
          id: 'livro-inteligencia-artificial-chatgpt-2-casadocodigo-2023',
          title: 'Inteligência Artificial e ChatGPT 2',
          subtitle:
            'Da revolução dos modelos de IA generativa à Engenharia de Prompt',
          author: ['Fabrício Carraro'],
          publishName: PublishNameEnum.CasaDoCodigo,
          publishYear: 2023,
          tags: ['Tag3', 'Tag4'],
          bookUrl:
            'https://www.casadocodigo.com.br/pages/sumario-inteligencia-artificial-chatgpt',
          pages: 223,
          progress: 100,
          favorite: false,
        },
      ],
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FilterPipe,
        ImgcursoPipe,
        MessageDateConclusionPipe,
        PrintTagsPipe,
        NgxPaginationModule,
        SortbyPipe,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        BookComponent, // Moved from declarations to imports
      ],
      // Removed BookComponent from declarations
      providers: [{ provide: DataService, useValue: dataServiceStub }, provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ensure ngOnInit is called
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return sorted tags', () => {
    const sortedTags = component.tagsArray();
    expect(sortedTags).toEqual(['Tag1', 'Tag2', 'Tag3', 'Tag4']);
  });

  it('should calculate absolute index correctly', () => {
    component.config().currentPage = 2;
    const index = component.absoluteIndex(2);
    expect(index).toBe(8);
  });

  it('should change page on onPageChange', () => {
    component.onPageChange(3);
    expect(component.config().currentPage).toBe(3);
  });

  it('should clear filters', () => {
    const currentPublishers = new Set(component.publishNameFilter());
    currentPublishers.add(PublishNameEnum.AltaBooks);
    component.publishNameFilter.set(currentPublishers);

    const currentTags = new Set(component.tagsFilter());
    currentTags.add('Tag1');
    component.tagsFilter.set(currentTags);

    component.clearFilters();
    expect(component.publishNameFilter().size).toBe(0);
    expect(component.tagsFilter().size).toBe(0);
  });

  it('should handle institution click event', () => {
    const event = {
      target: { id: 'input_book_institution_AltaBooks' },
    } as unknown as MouseEvent;
    component.onClickIntitutionEvent(event);
    expect(
      component.publishNameFilter().has(PublishNameEnum.AltaBooks)
    ).toBeTrue();
  });

  it('should handle tag click event', () => {
    const event = {
      target: { id: 'input_book_tag_Tag1' },
    } as unknown as MouseEvent;
    component.onClickTagEvent(event);
    expect(component.tagsFilter().has('Tag1')).toBeTrue();
  });

  it('should delete id from publishNameFilter on onClickIntitutionEvent', () => {
    const id = 'AltaBooks';
    const publishName = PublishNameEnum[id as keyof typeof PublishNameEnum];

    const currentFilters = new Set(component.publishNameFilter());
    currentFilters.add(publishName);
    component.publishNameFilter.set(currentFilters);

    const event = new MouseEvent('click');
    const inputElement = document.createElement('input');
    inputElement.id = `input_book_institution_${id}`;
    Object.defineProperty(event, 'target', { value: inputElement });

    component.onClickIntitutionEvent(event);

    expect(component.publishNameFilter().has(publishName)).toBeFalse();
  });

  it('should delete id from tagsFilter on onClickTagEvent', () => {
    const id = 'Test Tag';

    const currentTags = new Set(component.tagsFilter());
    currentTags.add(id);
    component.tagsFilter.set(currentTags);

    const event = new MouseEvent('click');
    const inputElement = document.createElement('input');
    inputElement.id = `input_book_tag_${id}`;
    Object.defineProperty(event, 'target', { value: inputElement });

    component.onClickTagEvent(event);

    expect(component.tagsFilter().has(id)).toBeFalse();
  });
});
