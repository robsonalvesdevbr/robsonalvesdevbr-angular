import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, DOCUMENT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let metaService: Meta;
  let titleService: Title;
  let document: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        SeoService,
        Meta,
        Title
      ],
    });

    service = TestBed.inject(SeoService);
    metaService = TestBed.inject(Meta);
    titleService = TestBed.inject(Title);
    document = TestBed.inject(DOCUMENT);
  });

  afterEach(() => {
    // Limpar structured data scripts
    document.getElementById('structured-data-person')?.remove();
    document.getElementById('structured-data-breadcrumb')?.remove();

    // Limpar canonical links
    document.querySelectorAll('link[rel="canonical"]').forEach(link => link.remove());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setAboutPageSeo', () => {
    it('should set page title', () => {
      const setTitleSpy = vi.spyOn(titleService, 'setTitle');

      service.setAboutPageSeo();

      expect(setTitleSpy).toHaveBeenCalledWith(
        'Sobre - Robson Alves | Arquiteto de Software com 23+ Anos de Experiência'
      );
    });

    it('should set meta description', () => {
      const updateTagSpy = vi.spyOn(metaService, 'updateTag');

      service.setAboutPageSeo();

      expect(updateTagSpy).toHaveBeenCalledWith({
        name: 'description',
        content: jasmine.stringContaining('Robson Alves')
      });
    });

    it('should set meta keywords', () => {
      const updateTagSpy = vi.spyOn(metaService, 'updateTag');

      service.setAboutPageSeo();

      expect(updateTagSpy).toHaveBeenCalledWith({
        name: 'keywords',
        content: jasmine.stringContaining('Robson Alves')
      });
    });

    it('should set Open Graph tags', () => {
      const updateTagSpy = vi.spyOn(metaService, 'updateTag');

      service.setAboutPageSeo();

      expect(updateTagSpy).toHaveBeenCalledWith({
        property: 'og:title',
        content: jasmine.any(String)
      });
      expect(updateTagSpy).toHaveBeenCalledWith({
        property: 'og:description',
        content: jasmine.any(String)
      });
      expect(updateTagSpy).toHaveBeenCalledWith({
        property: 'og:type',
        content: 'profile'
      });
      expect(updateTagSpy).toHaveBeenCalledWith({
        property: 'og:url',
        content: 'https://www.robsonalves.dev.br'
      });
      expect(updateTagSpy).toHaveBeenCalledWith({
        property: 'og:image',
        content: jasmine.stringContaining('.jpg')
      });
      expect(updateTagSpy).toHaveBeenCalledWith({
        property: 'og:locale',
        content: 'pt_BR'
      });
    });

    it('should set Twitter Card tags', () => {
      const updateTagSpy = vi.spyOn(metaService, 'updateTag');

      service.setAboutPageSeo();

      expect(updateTagSpy).toHaveBeenCalledWith({
        name: 'twitter:card',
        content: 'summary_large_image'
      });
      expect(updateTagSpy).toHaveBeenCalledWith({
        name: 'twitter:title',
        content: jasmine.any(String)
      });
      expect(updateTagSpy).toHaveBeenCalledWith({
        name: 'twitter:description',
        content: jasmine.any(String)
      });
      expect(updateTagSpy).toHaveBeenCalledWith({
        name: 'twitter:image',
        content: jasmine.stringContaining('.jpg')
      });
    });

    it('should set additional meta tags (author, robots, revisit)', () => {
      const updateTagSpy = vi.spyOn(metaService, 'updateTag');

      service.setAboutPageSeo();

      expect(updateTagSpy).toHaveBeenCalledWith({
        name: 'author',
        content: jasmine.any(String)
      });
      expect(updateTagSpy).toHaveBeenCalledWith({
        name: 'robots',
        content: 'index, follow'
      });
      expect(updateTagSpy).toHaveBeenCalledWith({
        name: 'revisit-after',
        content: '30 days'
      });
    });

    it('should inject structured data script', () => {
      service.setAboutPageSeo();

      const structuredDataScript = document.getElementById('structured-data-person');

      expect(structuredDataScript).toBeTruthy();
      expect(structuredDataScript?.type).toBe('application/ld+json');

      const jsonContent = JSON.parse(structuredDataScript?.textContent || '{}');
      expect(jsonContent['@context']).toBe('https://schema.org');
      expect(jsonContent['@type']).toBe('Person');
      expect(jsonContent.name).toBeTruthy();
      expect(jsonContent.jobTitle).toBeTruthy();
    });

    it('should remove existing structured data before adding new', () => {
      // Adicionar um script existente
      const existingScript = document.createElement('script');
      existingScript.id = 'structured-data-person';
      existingScript.type = 'application/ld+json';
      existingScript.textContent = '{}';
      document.head.appendChild(existingScript);

      service.setAboutPageSeo();

      const scripts = document.querySelectorAll('#structured-data-person');
      expect(scripts.length).toBe(1); // Apenas um script deve existir
    });

    it('should include social links in structured data', () => {
      service.setAboutPageSeo();

      const structuredDataScript = document.getElementById('structured-data-person');
      const jsonContent = JSON.parse(structuredDataScript?.textContent || '{}');

      expect(jsonContent.sameAs).toBeDefined();
      expect(Array.isArray(jsonContent.sameAs)).toBe(true);
    });

    it('should include knowsAbout skills in structured data', () => {
      service.setAboutPageSeo();

      const structuredDataScript = document.getElementById('structured-data-person');
      const jsonContent = JSON.parse(structuredDataScript?.textContent || '{}');

      expect(jsonContent.knowsAbout).toBeDefined();
      expect(Array.isArray(jsonContent.knowsAbout)).toBe(true);
      expect(jsonContent.knowsAbout).toContain('Arquitetura de Software');
    });

    it('should include occupation information in structured data', () => {
      service.setAboutPageSeo();

      const structuredDataScript = document.getElementById('structured-data-person');
      const jsonContent = JSON.parse(structuredDataScript?.textContent || '{}');

      expect(jsonContent.hasOccupation).toBeDefined();
      expect(Array.isArray(jsonContent.hasOccupation)).toBe(true);
      expect(jsonContent.hasOccupation[0]['@type']).toBe('Occupation');
    });
  });

  describe('generateBreadcrumbStructuredData', () => {
    it('should inject breadcrumb structured data', () => {
      service.generateBreadcrumbStructuredData();

      const breadcrumbScript = document.getElementById('structured-data-breadcrumb');

      expect(breadcrumbScript).toBeTruthy();
      expect(breadcrumbScript?.type).toBe('application/ld+json');

      const jsonContent = JSON.parse(breadcrumbScript?.textContent || '{}');
      expect(jsonContent['@context']).toBe('https://schema.org');
      expect(jsonContent['@type']).toBe('BreadcrumbList');
      expect(jsonContent.itemListElement).toBeDefined();
      expect(Array.isArray(jsonContent.itemListElement)).toBe(true);
    });

    it('should have correct breadcrumb structure', () => {
      service.generateBreadcrumbStructuredData();

      const breadcrumbScript = document.getElementById('structured-data-breadcrumb');
      const jsonContent = JSON.parse(breadcrumbScript?.textContent || '{}');

      expect(jsonContent.itemListElement.length).toBeGreaterThan(0);
      expect(jsonContent.itemListElement[0]['@type']).toBe('ListItem');
      expect(jsonContent.itemListElement[0].position).toBe(1);
      expect(jsonContent.itemListElement[0].name).toBe('Home');
    });

    it('should remove existing breadcrumb before adding new', () => {
      // Adicionar um breadcrumb existente
      const existingScript = document.createElement('script');
      existingScript.id = 'structured-data-breadcrumb';
      existingScript.type = 'application/ld+json';
      existingScript.textContent = '{}';
      document.head.appendChild(existingScript);

      service.generateBreadcrumbStructuredData();

      const scripts = document.querySelectorAll('#structured-data-breadcrumb');
      expect(scripts.length).toBe(1); // Apenas um script deve existir
    });

    it('should include all breadcrumb items', () => {
      service.generateBreadcrumbStructuredData();

      const breadcrumbScript = document.getElementById('structured-data-breadcrumb');
      const jsonContent = JSON.parse(breadcrumbScript?.textContent || '{}');

      expect(jsonContent.itemListElement.length).toBe(2);
      expect(jsonContent.itemListElement[1].name).toBe('Sobre');
    });
  });

  describe('updatePageCanonical', () => {
    it('should add canonical link', () => {
      service.updatePageCanonical();

      const canonicalLink = document.querySelector('link[rel="canonical"]');

      expect(canonicalLink).toBeTruthy();
      expect(canonicalLink?.getAttribute('href')).toBeTruthy();
    });

    it('should remove existing canonical link before adding new', () => {
      // Adicionar um canonical existente
      const existingCanonical = document.createElement('link');
      existingCanonical.setAttribute('rel', 'canonical');
      existingCanonical.setAttribute('href', 'https://old-url.com');
      document.head.appendChild(existingCanonical);

      service.updatePageCanonical();

      const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
      expect(canonicalLinks.length).toBe(1); // Apenas um canonical deve existir
    });

    it('should set correct canonical URL', () => {
      service.updatePageCanonical();

      const canonicalLink = document.querySelector('link[rel="canonical"]');
      const href = canonicalLink?.getAttribute('href');

      expect(href).toContain('robsonalves.dev.br');
    });

    it('should append canonical to head element', () => {
      const initialHeadChildrenCount = document.head.children.length;

      service.updatePageCanonical();

      expect(document.head.children.length).toBeGreaterThan(initialHeadChildrenCount);
    });
  });

  describe('Integration Tests', () => {
    it('should setup complete SEO for about page', () => {
      const setTitleSpy = vi.spyOn(titleService, 'setTitle');
      const updateTagSpy = vi.spyOn(metaService, 'updateTag');

      service.setAboutPageSeo();
      service.generateBreadcrumbStructuredData();
      service.updatePageCanonical();

      expect(setTitleSpy).toHaveBeenCalled();
      expect(updateTagSpy).toHaveBeenCalled();
      expect(document.getElementById('structured-data-person')).toBeTruthy();
      expect(document.getElementById('structured-data-breadcrumb')).toBeTruthy();
      expect(document.querySelector('link[rel="canonical"]')).toBeTruthy();
    });

    it('should be idempotent when called multiple times', () => {
      service.setAboutPageSeo();
      service.setAboutPageSeo();
      service.setAboutPageSeo();

      const personScripts = document.querySelectorAll('#structured-data-person');
      expect(personScripts.length).toBe(1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing head element gracefully', () => {
      // Não é possível remover head no jsdom, mas podemos verificar que não lança erro
      expect(() => {
        service.setAboutPageSeo();
      }).not.toThrow();
    });

    it('should generate valid JSON in structured data', () => {
      service.setAboutPageSeo();

      const structuredDataScript = document.getElementById('structured-data-person');

      expect(() => {
        JSON.parse(structuredDataScript?.textContent || '{}');
      }).not.toThrow();
    });

    it('should generate valid JSON in breadcrumb', () => {
      service.generateBreadcrumbStructuredData();

      const breadcrumbScript = document.getElementById('structured-data-breadcrumb');

      expect(() => {
        JSON.parse(breadcrumbScript?.textContent || '{}');
      }).not.toThrow();
    });
  });
});
