import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { VirtualPageTrackingService } from '@path-services/virtual-page-tracking.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LanguageService } from '@path-services/language.service';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let mockGoogleAnalyticsService: jasmine.SpyObj<GoogleAnalyticsService>;
  let mockVirtualPageService: jasmine.SpyObj<VirtualPageTrackingService>;

  beforeEach(async () => {
    mockGoogleAnalyticsService = jasmine.createSpyObj('GoogleAnalyticsService', ['event']);
    mockVirtualPageService = jasmine.createSpyObj('VirtualPageTrackingService', ['sendVirtualPageView']);

    await TestBed.configureTestingModule({
  imports: [NavigationComponent, HttpClientTestingModule],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClientTesting(),
        { provide: GoogleAnalyticsService, useValue: mockGoogleAnalyticsService },
        { provide: VirtualPageTrackingService, useValue: mockVirtualPageService }
      ],
    }).compileComponents();

  fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    // Flush i18n translation requests to enable TranslatePipe with PT-BR labels
    const httpMock = TestBed.inject(HttpTestingController);

    const ptReq = httpMock.expectOne('/assets/i18n/pt-BR.json');
    ptReq.flush({
      navigation: {
        ariaLabel: 'Navegação principal',
        toggleNavigation: 'Alternar navegação',
        about: 'Sobre',
        dashboard: 'Dashboard',
        graduation: '(Pós)Graduação',
        courses: 'Cursos',
        formations: 'Formação',
        books: 'Leituras',
        contact: 'Contato',
        skipToContent: 'Ir para o conteúdo'
      }
    });

    const enReq = httpMock.expectOne('/assets/i18n/en-US.json');
    enReq.flush({
      navigation: {
        ariaLabel: 'Main navigation',
        toggleNavigation: 'Toggle navigation',
        about: 'About',
        dashboard: 'Dashboard',
        graduation: 'Graduation',
        courses: 'Courses',
        formations: 'Formations',
        books: 'Books',
        contact: 'Contact',
        skipToContent: 'Skip to content'
      }
    });

  // Ensure PT-BR language for assertions
  const lang = TestBed.inject(LanguageService);
  lang.setLanguage('pt-BR');
  fixture.detectChanges();
  });

  it('should create the NavigationComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation titles', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#navbarResponsive')?.textContent).toContain('Sobre');
    expect(compiled.querySelector('#navbarResponsive')?.textContent).toContain('Dashboard');
    expect(compiled.querySelector('#navbarResponsive')?.textContent).toContain('(Pós)Graduação');
    expect(compiled.querySelector('#navbarResponsive')?.textContent).toContain('Cursos');
    expect(compiled.querySelector('#navbarResponsive')?.textContent).toContain('Formação');
    expect(compiled.querySelector('#navbarResponsive')?.textContent).toContain('Leituras');
    expect(compiled.querySelector('#navbarResponsive')?.textContent).toContain('Contato');
  });

  describe('Menu Hamburger Functionality', () => {
    it('should start with menu closed', () => {
      expect(component.isMenuOpen()).toBe(false);
    });

    it('should toggle menu from closed to open', () => {
      component.toggleMenu();
      expect(component.isMenuOpen()).toBe(true);
    });

    it('should toggle menu from open to closed', () => {
      component.isMenuOpen.set(true);
      component.toggleMenu();
      expect(component.isMenuOpen()).toBe(false);
    });

    it('should send analytics event when menu is toggled open', () => {
      component.toggleMenu();
      expect(mockGoogleAnalyticsService.event).toHaveBeenCalledWith('menu_toggle', 'navigation', 'opened');
    });

    it('should send analytics event when menu is toggled closed', () => {
      component.isMenuOpen.set(true);
      component.toggleMenu();
      expect(mockGoogleAnalyticsService.event).toHaveBeenCalledWith('menu_toggle', 'navigation', 'closed');
    });

    it('should close menu when closeMenu is called and menu is open', () => {
      component.isMenuOpen.set(true);
      component.closeMenu();
      expect(component.isMenuOpen()).toBe(false);
    });

    it('should do nothing when closeMenu is called and menu is already closed', () => {
      component.isMenuOpen.set(false);
      component.closeMenu();
      expect(component.isMenuOpen()).toBe(false);
    });

    it('should add "show" class to navbar-collapse when menu is open', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const navbarCollapse = compiled.querySelector('.navbar-collapse');

      component.isMenuOpen.set(true);
      fixture.detectChanges();

      expect(navbarCollapse?.classList.contains('show')).toBe(true);
    });

    it('should remove "show" class from navbar-collapse when menu is closed', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const navbarCollapse = compiled.querySelector('.navbar-collapse');

      component.isMenuOpen.set(false);
      fixture.detectChanges();

      expect(navbarCollapse?.classList.contains('show')).toBe(false);
    });

    it('should toggle menu when hamburger button is clicked', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const toggleButton = compiled.querySelector('.navbar-toggler') as HTMLButtonElement;

      toggleButton.click();
      fixture.detectChanges();

      expect(component.isMenuOpen()).toBe(true);
    });

    it('should update aria-expanded attribute when menu is toggled', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const toggleButton = compiled.querySelector('.navbar-toggler') as HTMLButtonElement;

      component.isMenuOpen.set(true);
      fixture.detectChanges();
      expect(toggleButton.getAttribute('aria-expanded')).toBe('true');

      component.isMenuOpen.set(false);
      fixture.detectChanges();
      expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('Navigation Link Clicks', () => {
    it('should close menu when "Sobre" link is clicked', async () => {
      component.isMenuOpen.set(true);
      const event = new Event('click');
      component.sobreAnalitics(event);

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(component.isMenuOpen()).toBe(false);
    });

    it('should close menu when "Dashboard" link is clicked', async () => {
      component.isMenuOpen.set(true);
      const event = new Event('click');
      component.dashboardAnalitics(event);

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(component.isMenuOpen()).toBe(false);
    });

    it('should close menu when "Graduação" link is clicked', async () => {
      component.isMenuOpen.set(true);
      const event = new Event('click');
      component.graduationAnalitics(event);

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(component.isMenuOpen()).toBe(false);
    });

    it('should close menu when "Cursos" link is clicked', async () => {
      component.isMenuOpen.set(true);
      const event = new Event('click');
      component.coursesAnalitics(event);

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(component.isMenuOpen()).toBe(false);
    });

    it('should close menu when "Formação" link is clicked', async () => {
      component.isMenuOpen.set(true);
      const event = new Event('click');
      component.formationcourseAnalitics(event);

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(component.isMenuOpen()).toBe(false);
    });

    it('should close menu when "Leituras" link is clicked', async () => {
      component.isMenuOpen.set(true);
      const event = new Event('click');
      component.booksAnalitics(event);

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(component.isMenuOpen()).toBe(false);
    });

    it('should close menu when "Contato" link is clicked', async () => {
      component.isMenuOpen.set(true);
      const event = new Event('click');
      component.contactAnalitics(event);

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(component.isMenuOpen()).toBe(false);
    });
  });

  describe('Cleanup', () => {
    it('should cleanup resources on destroy', () => {
      spyOn(component['analyticsBatcher'], 'destroy');
      component.ngOnDestroy();
      expect(component['analyticsBatcher'].destroy).toHaveBeenCalled();
    });
  });
});
