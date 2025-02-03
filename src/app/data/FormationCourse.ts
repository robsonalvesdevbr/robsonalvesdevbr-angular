import { InstitutionEnum } from '@path-app/models/InstitutionEnum';
import { IFormationCourse } from '@path-interfaces/IFormationCourse';

export const FormationCourses: IFormationCourse[] = [
  {
    name: 'C# e orientação a objetos',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/degree/certificate/2e01d0c3-8f5d-4715-a679-3061632a9298?lang=pt_BR',
    tags: [
      'software-development',
      'microsoft-technologies',
      'csharp',
      'dotnet',
    ],
    conclusion: new Date('2021-4-26'),
    favorite: true,
  },
  {
    name: 'Orquestração de containers com Kubernetes',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/degree/certificate/ecc51fe7-41c9-4eed-afad-5fd31aa1232a?lang=pt_BR',
    tags: ['kubernetes', 'docker-container', 'azure-cloud'],
    conclusion: new Date('2022-5-13'),
    favorite: true,
  },
  {
    name: 'Testes em .NET',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/degree/certificate/ef085642-633e-4daa-bdc8-017fd53bd4af?lang=pt_BR',
    tags: [
      'software-development',
      'microsoft-technologies',
      'csharp',
      'dotnet',
      'software-testing',
      'tdd',
    ],
    conclusion: new Date('2022-5-22'),
    favorite: true,
  },
  {
    name: 'Minha primeira liderança',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/degree/certificate/d4c360e6-b8c5-419e-8938-c7337603a927?lang=pt_BR',
    tags: ['agile', 'scrum'],
    conclusion: new Date('2022-5-24'),
    favorite: true,
  },
  {
    name: 'ASP.NET Core REST APIs',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/degree/certificate/51f1efcb-45f2-4005-b875-6890a5a43fe2?lang=pt_BR',
    tags: [
      'software-development',
      'microsoft-technologies',
      'csharp',
      'dotnet',
    ],
    conclusion: new Date('2022-5-25'),
    favorite: true,
  },
  {
    name: 'Linguagem Go',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/degree/certificate/ddaea616-7329-4661-a48a-a79db8bf8841?lang=pt_BR',
    tags: ['software-development', 'google-technologies', 'golang'],
    conclusion: new Date('2022-6-9'),
    favorite: true,
  },
  {
    name: 'Modelagem de dados',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/degree/certificate/c90fc5d1-85bc-4cd9-860f-5b7e1154e8aa?lang=pt_BR',
    tags: ['database-management'],
    conclusion: new Date('2022-8-3'),
    favorite: true,
  },
  {
    name: 'SQL com Microsoft SQL Server 2017',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/degree/certificate/463982aa-7353-4e1b-a775-cf1d574c17b7?lang=pt_BR',
    tags: ['database-management'],
    conclusion: new Date('2022-8-12'),
    favorite: true,
  },
  {
    name: 'Formação Boas praticas em C#',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/degree/certificate/3314396b-0286-4b16-bb62-636901486dde?lang=pt_BR',
    tags: ['solid', 'csharp', 'design-pattern', 'software-testing'],
    conclusion: new Date('2024-10-22'),
    favorite: true,
  },
  {
    name: 'Mensageria com Apache Kafka',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/degree/certificate/369add63-2c4a-4949-a6fe-498575a1f773?lang=pt_BR',
    tags: ['software-development', 'apache-technologies', 'kafka'],
    conclusion: new Date('2025-2-3'),
    favorite: true,
  },



  {
    name: 'Formação DevOps para Desenvolvedores',
    institution: InstitutionEnum.DesenvolvedorIO,
    certificateUrl:
      'https://desenvolvedor.io/certificado/2b295178-3cae-43bd-8925-98f17501fc8d',
    tags: ['docker-container', 'ci/cd', 'devops', 'git-github', 'azure-cloud'],
    conclusion: new Date('2024-6-11'),
    favorite: true,
  },
];
