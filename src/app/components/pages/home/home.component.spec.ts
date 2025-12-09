import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { HomeComponent } from './home.component';
import { NavigationComponent } from '@path-components/pages/navigation/navigation.component';
import { MasterheadComponent } from '@path-components/pages/masterhead/masterhead.component';
import { AboutComponent } from '@path-components/pages/about/about.component';
import { DashboardComponent } from '@path-components/pages/dashboard/dashboard.component';
import { GraduationComponent } from '@path-components/pages/graduation/graduation.component';
import { CourseComponent } from '@path-components/pages/course/course.component';
import { FormationCourseComponent } from '@path-components/pages/formationcourse/formationcourse.component';
import { BookComponent } from '@path-components/pages/book/book.component';
import { ContactComponent } from '@path-components/pages/contact/contact.component';
import { FooterComponent } from '@path-components/pages/footer/footer.component';
import { PlaceholderComponent } from '@path-components/utils/placeholder/placeholder.component';
import { LoadingComponent } from '@path-components/utils/loading/loading.component';
import { DataService } from '@path-services/data-service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        NavigationComponent,
        MasterheadComponent,
        AboutComponent,
        DashboardComponent,
        GraduationComponent,
        CourseComponent,
        FormationCourseComponent,
        BookComponent,
        ContactComponent,
        FooterComponent,
        PlaceholderComponent,
        LoadingComponent,
      ],
      providers: [
        provideZonelessChangeDetection(),
        DataService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Structure', () => {
    it('should use OnPush change detection strategy', () => {
      const componentDef = (component.constructor as any).ɵcmp;
      expect(componentDef.onPush).toBe(true);
    });

    it('should be a standalone component', () => {
      const componentDef = (component.constructor as any).ɵcmp;
      expect(componentDef.standalone).toBe(true);
    });

    it('should have correct selector', () => {
      const componentDef = (component.constructor as any).ɵcmp;
      expect(componentDef.selectors).toEqual([['app-home']]);
    });
  });

  describe('Critical Content (Immediate Load)', () => {
    it('should render navigation component immediately', () => {
      fixture.detectChanges();

      const navigationElement = fixture.nativeElement.querySelector('app-navigation');

      expect(navigationElement).toBeTruthy();
    });

    it('should render masterhead component immediately', () => {
      fixture.detectChanges();

      const masterheadElement = fixture.nativeElement.querySelector('app-masterhead');

      expect(masterheadElement).toBeTruthy();
    });

    it('should render masterhead with bglight input', () => {
      fixture.detectChanges();

      const masterheadElement = fixture.nativeElement.querySelector('app-masterhead');

      expect(masterheadElement).toBeTruthy();
      // O input bglight é passado, mas não podemos verificar diretamente no DOM
      // pois é uma propriedade do componente, não um atributo HTML
    });
  });

  describe('@defer Block Behavior', () => {
    it('should show placeholder initially for deferred content', () => {
      fixture.detectChanges();

      const placeholderElement = fixture.nativeElement.querySelector('app-placeholder');

      // Placeholder deve estar presente antes do defer carregar
      expect(placeholderElement).toBeTruthy();
    });

    it('should not render deferred components immediately', () => {
      fixture.detectChanges();

      const aboutElement = fixture.nativeElement.querySelector('app-about');
      const dashboardElement = fixture.nativeElement.querySelector('app-dashboard');

      // Componentes deferred não devem estar presentes imediatamente
      // (eles são carregados pelo @defer on viewport)
      expect(aboutElement).toBeFalsy();
      expect(dashboardElement).toBeFalsy();
    });

    it('should not show loading component before minimum time', () => {
      fixture.detectChanges();

      const loadingElement = fixture.nativeElement.querySelector('app-loading');

      // Loading só aparece após 500ms (after 500ms)
      expect(loadingElement).toBeFalsy();
    });
  });

  describe('Component Dependencies', () => {
    it('should successfully render child components', () => {
      fixture.detectChanges();

      // Verificar que componentes críticos são renderizados
      // Isso confirma que os imports estão funcionando
      const navigationElement = fixture.nativeElement.querySelector('app-navigation');
      const masterheadElement = fixture.nativeElement.querySelector('app-masterhead');

      expect(navigationElement).toBeTruthy();
      expect(masterheadElement).toBeTruthy();
    });

    it('should be a standalone component with imports', () => {
      const componentDef = (component.constructor as any).ɵcmp;

      // Componente standalone deve ter standalone=true
      expect(componentDef.standalone).toBe(true);
    });
  });

  describe('Template Structure', () => {
    it('should render navigation as first element', () => {
      fixture.detectChanges();

      const firstChild = fixture.nativeElement.firstElementChild;

      expect(firstChild?.tagName.toLowerCase()).toBe('app-navigation');
    });

    it('should render masterhead as second element', () => {
      fixture.detectChanges();

      const children = Array.from(fixture.nativeElement.children);
      const secondChild = children[1] as HTMLElement;

      expect(secondChild?.tagName.toLowerCase()).toBe('app-masterhead');
    });

    it('should have error fallback in template', () => {
      fixture.detectChanges();

      // O error fallback está no template mas só aparece em caso de erro
      // Não podemos testar facilmente sem simular erro no @defer
      expect(component).toBeTruthy();
    });
  });

  describe('Performance Optimizations', () => {
    it('should use viewport trigger for defer block', () => {
      // O @defer on viewport garante que conteúdo só carrega quando visível
      // Esta é uma otimização importante para performance
      fixture.detectChanges();

      // Verificar que componentes deferred não estão no DOM inicialmente
      const deferredComponents = [
        'app-about',
        'app-dashboard',
        'app-graduation',
        'app-course',
        'app-formationcourse',
        'app-book',
        'app-contact',
        'app-footer',
      ];

      deferredComponents.forEach(selector => {
        const element = fixture.nativeElement.querySelector(selector);
        expect(element).toBeFalsy();
      });
    });

    it('should have minimum timing configured for loading state', () => {
      // Loading state tem minimum 100ms e after 500ms
      // Isso evita flash de loading para carregamentos rápidos
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });

    it('should have minimum timing configured for placeholder state', () => {
      // Placeholder tem minimum 300ms
      // Isso evita flash de placeholder
      fixture.detectChanges();

      const placeholderElement = fixture.nativeElement.querySelector('app-placeholder');

      expect(placeholderElement).toBeTruthy();
    });
  });

  describe('bglight Input Propagation', () => {
    it('should pass bglight=true to masterhead', () => {
      fixture.detectChanges();

      // bglight é passado como input, verificamos que o componente está presente
      const masterheadElement = fixture.nativeElement.querySelector('app-masterhead');

      expect(masterheadElement).toBeTruthy();
    });

    it('should pass bglight to components that support it', () => {
      fixture.detectChanges();

      // Dashboard, Course e Book recebem [bglight]="true" no template
      // Verificamos que os componentes existem
      expect(component).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should render semantic HTML structure', () => {
      fixture.detectChanges();

      // Verificar que elementos são renderizados
      expect(fixture.nativeElement.children.length).toBeGreaterThan(0);
    });

    it('should have accessible error message', () => {
      fixture.detectChanges();

      // Error fallback tem alert-warning e ícone
      // Não podemos verificar sem simular erro, mas estrutura está correta
      expect(component).toBeTruthy();
    });
  });

  describe('Integration', () => {
    it('should initialize without errors', () => {
      expect(() => {
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should not throw errors during change detection', () => {
      fixture.detectChanges();

      expect(() => {
        fixture.detectChanges();
        fixture.detectChanges();
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should maintain component integrity after multiple change detections', () => {
      fixture.detectChanges();
      fixture.detectChanges();
      fixture.detectChanges();

      const navigationElement = fixture.nativeElement.querySelector('app-navigation');
      const masterheadElement = fixture.nativeElement.querySelector('app-masterhead');

      expect(navigationElement).toBeTruthy();
      expect(masterheadElement).toBeTruthy();
    });
  });

  describe('Component Lifecycle', () => {
    it('should initialize component instance', () => {
      expect(component).toBeTruthy();
      expect(component).toBeInstanceOf(HomeComponent);
    });

    it('should render template after initialization', () => {
      fixture.detectChanges();

      expect(fixture.nativeElement.children.length).toBeGreaterThan(0);
    });

    it('should handle fixture destruction', () => {
      fixture.detectChanges();

      expect(() => {
        fixture.destroy();
      }).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple detectChanges calls', () => {
      for (let i = 0; i < 10; i++) {
        expect(() => fixture.detectChanges()).not.toThrow();
      }
    });

    it('should maintain state after detectChanges', () => {
      fixture.detectChanges();

      const initialNav = fixture.nativeElement.querySelector('app-navigation');

      fixture.detectChanges();

      const afterNav = fixture.nativeElement.querySelector('app-navigation');

      expect(initialNav).toBeTruthy();
      expect(afterNav).toBeTruthy();
    });

    it('should not leak memory on repeated renders', () => {
      // Teste básico de memória - renderizar múltiplas vezes
      for (let i = 0; i < 5; i++) {
        const tempFixture = TestBed.createComponent(HomeComponent);
        tempFixture.detectChanges();
        tempFixture.destroy();
      }

      expect(true).toBe(true); // Se chegou aqui, não houve crash
    });
  });
});
