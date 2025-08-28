import { Injectable, inject, DOCUMENT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Profile } from '@path-data/Profile';

interface StructuredDataPerson {
  '@context': string;
  '@type': string;
  name: string;
  alternateName?: string;
  description: string;
  url: string;
  image?: string;
  jobTitle: string;
  worksFor?: {
    '@type': string;
    name: string;
  };
  address?: {
    '@type': string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  sameAs: string[];
  knowsAbout: string[];
  hasOccupation: Array<{
    '@type': string;
    name: string;
    description: string;
    estimatedSalary?: {
      '@type': string;
      currency: string;
      value: {
        '@type': string;
        minValue: number;
        maxValue: number;
        unitText: string;
      };
    };
    experienceRequirements: string;
    occupationLocation: {
      '@type': string;
      name: string;
    };
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  setAboutPageSeo(): void {
    // Set page title
    this.title.setTitle('Sobre - Robson Alves | Arquiteto de Software com 23+ Anos de Experiência');

    // Set meta description
    this.meta.updateTag({
      name: 'description',
      content: 'Conheça Robson Alves: Arquiteto de Software com 23+ anos de experiência, especialista em .NET, Cloud (Azure/AWS), e modernização de sistemas financeiros. Trajetória única de instrutor a arquiteto.'
    });

    // Set meta keywords
    this.meta.updateTag({
      name: 'keywords',
      content: 'Robson Alves, Arquiteto de Software, .NET, Azure, AWS, Cloud Computing, C#, Desenvolvedor Senior, Líder Técnico, Sistemas Financeiros, Curitiba'
    });

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: 'Robson Alves - Arquiteto de Software | 23+ Anos de Experiência' });
    this.meta.updateTag({ property: 'og:description', content: 'Arquiteto de Software com 23+ anos de experiência, especialista em modernização de sistemas e arquitetura cloud.' });
    this.meta.updateTag({ property: 'og:type', content: 'profile' });
    this.meta.updateTag({ property: 'og:url', content: 'https://www.robsonalves.dev.br' });
    this.meta.updateTag({ property: 'og:image', content: 'https://www.robsonalves.dev.br/assets/img/robson-alves-og.jpg' });
    this.meta.updateTag({ property: 'og:locale', content: 'pt_BR' });

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Robson Alves - Arquiteto de Software' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Arquiteto de Software com 23+ anos de experiência, especialista em modernização de sistemas e arquitetura cloud.' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://www.robsonalves.dev.br/assets/img/robson-alves-twitter.jpg' });

    // Additional professional meta tags
    this.meta.updateTag({ name: 'author', content: Profile.name });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'revisit-after', content: '30 days' });

    // Generate and inject structured data
    this.injectStructuredData();
  }

  private injectStructuredData(): void {
    const socialLinks = Array.from(Profile.urlList.values());

    const structuredData: StructuredDataPerson = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: Profile.name,
      alternateName: 'Robson Alves',
      description: 'Arquiteto de Software com 23+ anos de experiência, especialista em modernização de sistemas e arquitetura cloud.',
      url: 'https://www.robsonalves.dev.br',
      image: 'https://www.robsonalves.dev.br/assets/img/profile.jpg',
      jobTitle: 'Arquiteto de Software & Líder Técnico',
      worksFor: {
        '@type': 'Organization',
        name: 'Consilux'
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: Profile.city,
        addressRegion: Profile.state,
        addressCountry: Profile.country
      },
      sameAs: socialLinks,
      knowsAbout: [
        'Arquitetura de Software',
        'Cloud Computing',
        'Microsoft Azure',
        'Amazon Web Services',
        '.NET Framework',
        'C# Programming',
        'Microservices Architecture',
        'DevOps',
        'Financial Software Systems',
        'Software Development Leadership'
      ],
      hasOccupation: [{
        '@type': 'Occupation',
        name: 'Software Architect',
        description: 'Especialista em arquitetura de software, modernização de sistemas legados e liderança técnica no setor financeiro',
        experienceRequirements: '23+ years of software development experience',
        occupationLocation: {
          '@type': 'City',
          name: `${Profile.city}, ${Profile.state}, ${Profile.country}`
        }
      }]
    };

    // Remove existing structured data
    const existingScript = this.document.getElementById('structured-data-person');
    if (existingScript) {
      existingScript.remove();
    }

    // Create and inject new structured data
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'structured-data-person';
    script.textContent = JSON.stringify(structuredData, null, 2);
    
    // Inject into document head
    const head = this.document.getElementsByTagName('head')[0];
    head.appendChild(script);
  }

  generateBreadcrumbStructuredData(): void {
    const breadcrumbStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://www.robsonalves.dev.br'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Sobre',
          'item': 'https://www.robsonalves.dev.br#about'
        }
      ]
    };

    // Remove existing breadcrumb structured data
    const existingBreadcrumb = this.document.getElementById('structured-data-breadcrumb');
    if (existingBreadcrumb) {
      existingBreadcrumb.remove();
    }

    // Create and inject breadcrumb structured data
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'structured-data-breadcrumb';
    script.textContent = JSON.stringify(breadcrumbStructuredData, null, 2);
    
    const head = this.document.getElementsByTagName('head')[0];
    head.appendChild(script);
  }

  updatePageCanonical(): void {
    // Remove existing canonical link
    const existingCanonical = this.document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Add canonical link
    const canonicalLink = this.document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', 'https://www.robsonalves.dev.br#about');
    
    const head = this.document.getElementsByTagName('head')[0];
    head.appendChild(canonicalLink);
  }

}