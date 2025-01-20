import { InstitutionEnum } from '@path-app/models/InstitutionEnum';
import { ICourse } from '@path-interfaces/ICourse';

export const Courses: ICourse[] = [
  {
    name: 'GitHub Copilot: Formação Básica',
    institution: InstitutionEnum.LinkedinLearning,
    certificateUrl:
      'https://www.linkedin.com/learning/certificates/86c236d05e24c26443322a5d07c3026de9e74e8c9a13ae51d9266105b1ddc291?trk=share_certificate',
    tags: ['artificial-intelligence', 'github', 'copilot'],
    conclusion: new Date('2024-8-22'),
    favorite: true,
  },
  {
    name: 'Comunicação Assertiva para Gestores de Alto Desempenho',
    institution: InstitutionEnum.LinkedinLearning,
    certificateUrl:
      'https://www.linkedin.com/learning/certificates/f1cd3d0f28df30ef793720cf64234c5f249822e19e68e8f3fb3f9bd12d56ab7c?trk=share_certificate',
    tags: ['communication', 'leadership'],
    conclusion: new Date('2024-8-30'),
    favorite: true,
  },
  {
    name: 'Fundamentos da Tecnologia Blockchain',
    institution: InstitutionEnum.LinkedinLearning,
    certificateUrl:
      'https://www.linkedin.com/learning/certificates/0b810fbc20a789b7d3dab7cf63abc26075b2093494a8ee426cad583add7060c3?trk=share_certificate',
    tags: ['cripto', 'blockchain'],
    conclusion: new Date('2024-9-14'),
    favorite: false,
  },
  {
    name: 'IA Generativa para Profissionais Criativos: Oportunidades, Desafios e Ética',
    institution: InstitutionEnum.LinkedinLearning,
    certificateUrl:
      'https://www.linkedin.com/learning/certificates/f7ce89a6b89cd86f123f07c866c495d32fe879d31f28e7f2f347313c9560626b?trk=share_certificate',
    tags: ['artificial-intelligence'],
    conclusion: new Date('2024-9-14'),
    favorite: false,
  },
  {
    name: 'Como Impulsionar a Sustentabilidade Através da Tecnologia',
    institution: InstitutionEnum.LinkedinLearning,
    certificateUrl:
      'https://www.linkedin.com/learning/certificates/1fe034be3576a625b3f6ceeebe4b4488d1dff545b51acccf20716a20b3e80c58?trk=share_certificate',
    tags: ['sustainability', 'technology'],
    conclusion: new Date('2024-9-16'),
    favorite: false,
  },

  {
    name: 'Iniciando com ASP.NET Core',
    institution: InstitutionEnum.DesenvolvedorIO,
    certificateUrl:
      'https://desenvolvedor.io/curso/baixar-certificado/74c90a14-45bc-4748-a329-ff76b9f73c8b',
    tags: ['software-development', 'microsoft', 'csharp', '.net'],
    conclusion: new Date('2023-12-4'),
    favorite: false,
  },
  {
    name: 'Projetando Arquiteturas em Três Camadas',
    institution: InstitutionEnum.DesenvolvedorIO,
    certificateUrl:
      'https://desenvolvedor.io/curso/baixar-certificado/348ea229-b2b7-494c-b588-2bd6ed47f697',
    tags: [
      'software-development',
      'microsoft',
      'csharp',
      '.net',
      'architecture',
    ],
    conclusion: new Date('2023-11-23'),
    favorite: true,
  },
  {
    name: 'Dominando o Kubernetes',
    institution: InstitutionEnum.DesenvolvedorIO,
    certificateUrl:
      'https://desenvolvedor.io/curso/baixar-certificado/2339b4a9-588f-4356-93c0-208678c5489b',
    tags: ['kubernetes', 'docker-container'],
    conclusion: new Date('2023-8-8'),
    favorite: true,
  },
  {
    name: 'Fundamentos do C#',
    institution: InstitutionEnum.DesenvolvedorIO,
    certificateUrl:
      'https://desenvolvedor.io/curso/baixar-certificado/668fdb1c-99e0-4e85-adf4-6b542f71f14e',
    tags: ['software-development', 'microsoft', 'csharp', '.net'],
    conclusion: new Date('2023-1-16'),
    favorite: false,
  },
  {
    name: 'Dominando o Apache Kafka',
    institution: InstitutionEnum.DesenvolvedorIO,
    certificateUrl:
      'https://desenvolvedor.io/curso/baixar-certificado/5813f9a2-8f15-4682-a239-183a679287ec',
    tags: ['software-development', 'messagerie', 'amqp'],
    conclusion: new Date('2022-8-12'),
    favorite: true,
  },
  {
    name: 'Fundamentos de Arquitetura de Software',
    institution: InstitutionEnum.DesenvolvedorIO,
    certificateUrl:
      'https://desenvolvedor.io/curso/baixar-certificado/633d37f3-f03f-40d4-a3b6-afd558ccf364',
    tags: [
      'software-development',
      'microsoft',
      'csharp',
      '.net',
      'architecture',
    ],
    conclusion: new Date('2022-9-22'),
    favorite: true,
  },
  {
    name: 'Introdução ao DevOps',
    institution: InstitutionEnum.DesenvolvedorIO,
    certificateUrl:
      'https://desenvolvedor.io/curso/baixar-certificado/bf3a9141-f47e-4d5e-8cca-3e2790245c31',
    tags: ['devops'],
    conclusion: new Date('2022-9-19'),
    favorite: false,
  },
  {
    name: 'Desenvolvimento SPA com Angular',
    institution: InstitutionEnum.DesenvolvedorIO,
    certificateUrl:
      'https://desenvolvedor.io/curso/baixar-certificado/bbb08bef-cc6a-4af1-ab89-36fc72fd2f70',
    tags: ['software-development', 'angular', 'typescript', 'javascript'],
    conclusion: new Date('2022-8-31'),
    favorite: false,
  },
  {
    name: 'Fundamentos de Criptografia e Hashing',
    institution: InstitutionEnum.DesenvolvedorIO,
    certificateUrl:
      'https://desenvolvedor.io/curso/baixar-certificado/3f08e65b-3f99-40d2-b2f7-3c92f04228b0',
    tags: ['crypto', 'hash'],
    conclusion: new Date('2022-8-22'),
    favorite: true,
  },
  {
    name: 'Iniciando com ASP.NET Core',
    institution: InstitutionEnum.DesenvolvedorIO,
    certificateUrl:
      'https://desenvolvedor.io/curso/baixar-certificado/f9a5fc5f-9bcf-4308-bf17-b0bde1e78378',
    tags: [
      'software-development',
      'microsoft',
      'csharp',
      '.net',
      'architecture',
    ],
    conclusion: new Date('2021-11-4'),
    favorite: false,
  },
  {
    name: 'Docker do Zero ao Avançado',
    institution: InstitutionEnum.DesenvolvedorIO,
    certificateUrl:
      'https://desenvolvedor.io/curso/baixar-certificado/12546112-619c-4b01-8097-851e3fbbb262',
    tags: ['docker-container', 'docker-container', 'kubernetes'],
    conclusion: new Date('2024-3-28'),
    favorite: false,
  },
  {
    name: 'Git e Github do Zero ao Avançado',
    institution: InstitutionEnum.DesenvolvedorIO,
    certificateUrl:
      'https://desenvolvedor.io/certificado/9082ea6f-5efd-458f-ba55-55c39f0b3de6',
    tags: ['git', 'github', 'versioning'],
    conclusion: new Date('2024-6-11'),
    favorite: false,
  },
  {
    name: 'Fundamentos do Blazor',
    institution: InstitutionEnum.DesenvolvedorIO,
    certificateUrl:
      'https://desenvolvedor.io/certificado/c37bb6aa-ca3f-41f8-b623-347bd057c805',
    tags: ['blazor', 'software-development', 'microsoft', 'csharp', '.net'],
    conclusion: new Date('2024-7-2'),
    favorite: true,
  },

  {
    name: 'C# COMPLETO Programação Orientada a Objetos + Projetos',
    institution: InstitutionEnum.Udemy,
    certificateUrl: 'https://www.udemy.com/certificate/UC-26OBZ64N',
    tags: ['software-development', 'microsoft', 'csharp', '.net'],
    conclusion: new Date('2019-5-16'),
    favorite: true,
  },
  {
    name: 'C# - Aplicando Princípios SOLID na prática',
    institution: InstitutionEnum.Udemy,
    certificateUrl:
      'https://www.udemy.com/certificate/UC-70fa6e0e-c9fe-464a-bdbe-7881547c9779',
    tags: ['software-development', 'microsoft', 'csharp', '.net'],
    conclusion: new Date('2022-6-22'),
    favorite: true,
  },
  {
    name: 'O curso completo de Banco de Dados e SQL, sem mistérios!',
    institution: InstitutionEnum.Udemy,
    certificateUrl: 'https://www.udemy.com/certificate/UC-T3Y1X056',
    tags: ['sql', 'microsoft', 'database', 'sqlserver', 'postgres'],
    conclusion: new Date('2019-6-6'),
    favorite: true,
  },
  {
    name: 'Azure Pipelines - CI/CD, Docker e Kubernetes no Azure DevOps',
    institution: InstitutionEnum.Udemy,
    certificateUrl:
      'https://www.udemy.com/certificate/UC-ca99013d-a26a-4121-bdde-dc6c44cc7663',
    tags: [
      'devops',
      'microsoft',
      'kubernetes',
      'docker-container',
      'docker-container',
    ],
    conclusion: new Date('2021-8-19'),
    favorite: true,
  },
  {
    name: 'Event Driven Architecture - The Complete Guide',
    institution: InstitutionEnum.Udemy,
    certificateUrl:
      'https://www.udemy.com/certificate/UC-b711b1a6-8955-47a1-8b5c-bed43c73d0dd',
    tags: ['architecture', 'software-development', 'software'],
    conclusion: new Date('2023-1-10'),
    favorite: false,
  },
  {
    name: 'Modelagem de Dados UML (Análise&Projeto Orientado a Objetos)',
    institution: InstitutionEnum.Udemy,
    certificateUrl:
      'https://www.udemy.com/certificate/UC-018f706e-7090-4b43-9b99-896142a53241',
    tags: ['architecture', 'software-development', 'software', 'uml'],
    conclusion: new Date('2023-2-3'),
    favorite: false,
  },
  {
    name: 'Microsoft Azure Active Directory',
    institution: InstitutionEnum.Udemy,
    certificateUrl:
      'https://www.udemy.com/certificate/UC-72cf91c3-4f64-4674-b560-c4d20570733a',
    tags: ['microsoft', 'azure', 'entraid'],
    conclusion: new Date('2022-11-3'),
    favorite: false,
  },
  {
    name: 'Azure Databases para Iniciantes',
    institution: InstitutionEnum.Udemy,
    certificateUrl:
      'https://www.udemy.com/certificate/UC-1629d9df-3184-41c5-83a4-943d89bf3910',
    tags: ['microsoft', 'azure', 'sqlserver', 'database'],
    conclusion: new Date('2022-11-1'),
    favorite: false,
  },
  {
    name: 'JIRA Software Ágil Scrum e Kanban',
    institution: InstitutionEnum.Udemy,
    certificateUrl:
      'https://www.udemy.com/certificate/UC-3b46fa6d-4269-4a9e-8b5f-f2dc75e02b8c',
    tags: ['agile', 'jira', 'scrum'],
    conclusion: new Date('2024-4-30'),
    favorite: false,
  },
  {
    name: 'O Curso completo de NoSQL sem mistérios! MongoDB Neo4J',
    institution: InstitutionEnum.Udemy,
    certificateUrl:
      'https://www.udemy.com/certificate/UC-656d5b3c-2d25-4091-9a42-f4c8cbd03eb3',
    tags: ['database', 'nosql', 'neo4j', 'mongodb', 'database', 'graph'],
    conclusion: new Date('2024-5-7'),
    favorite: true,
  },
  {
    name: 'Git e GitHub do básico ao avançado 2024',
    institution: InstitutionEnum.Udemy,
    certificateUrl:
      'https://www.udemy.com/certificate/UC-29260e31-edab-4ac5-8698-7b3c4a76a481',
    tags: ['git', 'github'],
    conclusion: new Date('2024-5-23'),
    favorite: false,
  },
  {
    name: 'Orquestração de Containers com Kubernetes',
    institution: InstitutionEnum.Udemy,
    certificateUrl:
      'https://www.udemy.com/certificate/UC-2373b685-9826-465e-8ad5-93587c5339ff',
    tags: ['kubernetes', 'k8s', 'docker-container'],
    conclusion: new Date('2022-6-22'),
    favorite: true,
  },
  {
    name: 'Certificação Microsoft Azure Architect AZ-303 e AZ-304',
    institution: InstitutionEnum.Udemy,
    certificateUrl:
      'https://www.udemy.com/certificate/UC-80a5aef3-08d8-46f5-8c63-ae985159c271',
    tags: ['azure', 'cloud-computing', 'microsoft', 'az-303', 'az-304'],
    conclusion: new Date('2024-7-10'),
    favorite: true,
  },
  {
    name: 'ChatGPT Completo: Domine Chat GPT e Inteligência Artificial',
    institution: InstitutionEnum.Udemy,
    certificateUrl:
      'https://www.udemy.com/certificate/UC-4a973d15-299e-4020-8c83-89ec5d25008d',
    tags: ['artificial-intelligence', 'chatbot', 'gpt', 'chatgpt'],
    conclusion: new Date('2024-9-10'),
    favorite: false,
  },
  {
    name: 'Go (Golang): Explorando a Linguagem do Google',
    institution: InstitutionEnum.Udemy,
    certificateUrl:
      'https://www.udemy.com/certificate/UC-3680a779-14d8-4d87-9bd4-26c371778346',
    tags: ['software-development', 'go', 'golang', 'google'],
    conclusion: new Date('2024-11-6'),
    favorite: true,
  },
  {
    name: 'Clean Architecture Essencial - ASP .NET Core com C#',
    institution: InstitutionEnum.Udemy,
    certificateUrl:
      'https://www.udemy.com/certificate/UC-37e332de-70b6-4294-b953-f747172c4518',
    tags: ['software-development', 'microsoft', 'csharp', '.net', 'architecture'],
    conclusion: new Date('2025-1-20'),
    favorite: true,
  },

  {
    name: 'Lógica de programação: explore funções e listas',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/06a6aa9d-4057-46a9-a082-d2b810998a01?lang=pt_BR',
    tags: ['software-development', 'logic'],
    conclusion: new Date('2024-2-17'),
    favorite: false,
  },
  {
    name: 'Lógica de programação: mergulhe em programação com JavaScript',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/f8a1f9fd-a3ac-4100-b398-38d891f09952?lang=pt_BR',
    tags: ['software-development', 'logic'],
    conclusion: new Date('2024-1-3'),
    favorite: false,
  },
  {
    name: 'Microsoft SQL Server 2022: conhecendo SQL',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/573c53e0-215a-4138-8866-6b8a91621b81?lang=pt_BR',
    tags: ['database', 'sqlserver'],
    conclusion: new Date('2023-9-5'),
    favorite: false,
  },
  {
    name: 'Azure Cloud: segurança e recursos avançados',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/ee5f9313-467b-44a5-ad05-b553b39d77b5?lang=pt_BR',
    tags: ['cloud-computing', 'azure'],
    conclusion: new Date('2023-8-22'),
    favorite: false,
  },
  {
    name: 'Azure Cloud: criando um servidor com banco de dados para receber uma aplicação',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/57764ba5-ebeb-4195-9cdd-67e578bb5b2b?lang=pt_BR',
    tags: ['cloud-computing', 'azure', 'database'],
    conclusion: new Date('2023-8-17'),
    favorite: false,
  },
  {
    name: 'Kubernetes: prática, Helm e Cloud',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/1bd12d60-6a2f-438b-b669-03709ca8c734?lang=pt_BR',
    tags: ['cloud-computing', 'azure', 'kubernetes', 'docker-container'],
    conclusion: new Date('2023-8-16'),
    favorite: true,
  },
  {
    name: 'Dart: criando e manipulando variáveis e listas',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/362f75ac-a636-40d2-bcbf-0c448a39c528?lang=pt_BR',
    tags: ['software-development', 'dart'],
    conclusion: new Date('2023-3-1'),
    favorite: false,
  },
  {
    name: 'OWASP Top 10: de Injections a Broken Access Control',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/54be0077-be6d-4d69-8573-86e5353a1c6c?lang=pt_BR',
    tags: ['cloud-computing', 'security'],
    conclusion: new Date('2023-1-19'),
    favorite: true,
  },
  {
    name: '.NET 6: criando uma web API',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/e5b315fd-973e-45b5-b4a7-44d1d609bc37?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2023-1-12'),
    favorite: false,
  },
  {
    name: 'Vue3: explorando o framework',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/a977f1f5-8f86-4589-a92b-d023fe439196?lang=pt_BR',
    tags: ['software-development', 'vue'],
    conclusion: new Date('2022-8-15'),
    favorite: false,
  },
  {
    name: 'Rust: a linguagem de programação performática e segura',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/bade0182-f781-44e4-a8ff-ebd874c0554f?lang=pt_BR',
    tags: ['software-development', 'rust'],
    conclusion: new Date('2022-8-12'),
    favorite: true,
  },
  {
    name: 'Rust: aprenda mais sobre tipos',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/1e1d3c58-87c4-4e5d-992a-d13e6217530b?lang=pt_BR',
    tags: ['software-development', 'rust'],
    conclusion: new Date('2022-8-12'),
    favorite: true,
  },
  {
    name: 'SQL Server: administração do Microsoft SQL Server 2017',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/41279343-fbd3-49e2-8373-29cda9909596?lang=pt_BR',
    tags: ['database', 'sqlserver'],
    conclusion: new Date('2022-8-12'),
    favorite: false,
  },
  {
    name: 'SQL Server: T-SQL com Microsoft SQL Server 2017',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/a7f8d24d-aa64-404f-8197-6dfdb6a017c5?lang=pt_BR',
    tags: ['database', 'sqlserver'],
    conclusion: new Date('2022-8-10'),
    favorite: false,
  },
  {
    name: 'SQL Server: Manipulação de dados com Microsoft SQL Server 2017',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/f9fcd1eb-e007-4e7a-a417-192a446c53b9?lang=pt_BR',
    tags: ['database', 'sqlserver'],
    conclusion: new Date('2022-8-9'),
    favorite: false,
  },
  {
    name: 'SQL Server: consultas avançadas com Microsoft SQL Server 2017',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/cab204dd-3c1a-4101-bdda-f778cdd7117b?lang=pt_BR',
    tags: ['database', 'sqlserver'],
    conclusion: new Date('2022-8-8'),
    favorite: false,
  },
  {
    name: 'SQL Server: Introdução ao SQL com Microsoft SQL Server 2017',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/42559db4-15e4-4a16-9bd8-b13e8a94b345?lang=pt_BR',
    tags: ['database', 'sqlserver'],
    conclusion: new Date('2022-8-8'),
    favorite: false,
  },
  {
    name: 'Modelagem de banco de dados relacional: Álgebra Relacional',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/cf23a4eb-7223-4523-8b69-8c70f6b8fa21?lang=pt_BR',
    tags: ['database', 'sqlserver'],
    conclusion: new Date('2022-8-3'),
    favorite: false,
  },
  {
    name: 'Modelagem de banco de dados relacional: entendendo SQL',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/097df050-faa9-4504-80ba-5587925077fe?lang=pt_BR',
    tags: ['database', 'sqlserver'],
    conclusion: new Date('2022-8-3'),
    favorite: false,
  },
  {
    name: 'Modelagem de banco de dados relacional: normalização',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/184457d6-5fe9-4187-ad29-6ed0e5015a4f?lang=pt_BR',
    tags: ['database', 'sqlserver'],
    conclusion: new Date('2022-8-3'),
    favorite: false,
  },
  {
    name: 'Modelagem de banco de dados relacional: modelagem lógica e física',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/6addd0fb-4be1-48f4-8b8e-8f2fe70699b3?lang=pt_BR',
    tags: ['database', 'sqlserver'],
    conclusion: new Date('2022-8-2'),
    favorite: false,
  },
  {
    name: 'Modelagem de banco de dados: entidades, relacionamentos e atributos',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/f4fb9541-03d7-4214-a7ad-b960fb02f736?lang=pt_BR',
    tags: ['database', 'sqlserver'],
    conclusion: new Date('2022-8-1'),
    favorite: false,
  },
  {
    name: 'Redis II: estruturas e recursos na sua base NoSQL',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/8b3d2118-b233-4530-ad60-d9254f091a7e?lang=pt_BR',
    tags: ['database', 'redis', 'cache'],
    conclusion: new Date('2022-7-20'),
    favorite: false,
  },
  {
    name: 'Redis I: armazenando chaves e valores',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/f3e017a1-fb3e-4b50-b33e-2a42fbf4cc74?lang=pt_BR',
    tags: ['database', 'redis', 'cache'],
    conclusion: new Date('2022-7-20'),
    favorite: false,
  },
  {
    name: 'Microsserviços e .NET6: implementando a comunicação',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/e51f515b-bb63-4333-9dfe-5961c2eb1da1?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2022-7-27'),
    favorite: false,
  },
  {
    name: 'Modelagem MongoDB: relacionamentos e cardinalidade',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/1fdb3723-9f1b-4f06-bc90-c268502224f7?lang=pt_BR',
    tags: ['database', 'nosql'],
    conclusion: new Date('2022-7-25'),
    favorite: false,
  },
  {
    name: 'MongoDB: modelagem de dados',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/ca5dbfc1-068a-43d7-8759-5134ab1263c4?lang=pt_BR',
    tags: ['database', 'nosql'],
    conclusion: new Date('2022-7-22'),
    favorite: false,
  },
  {
    name: 'MongoDB: uma alternativa aos bancos relacionais tradicionais',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/2cdd5a78-4b70-42e8-a4ba-d319cff5776a?lang=pt_BR',
    tags: ['database', 'nosql'],
    conclusion: new Date('2022-7-22'),
    favorite: false,
  },
  {
    name: 'C#: entendendo exceções',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/31f830a1-a293-4840-9c26-b4fa1f89f655?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2022-7-19'),
    favorite: false,
  },
  {
    name: 'Estrutura de Dados: computação na prática com Java',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/e40feed1-13aa-420c-8747-5e84bf1bb837?lang=pt_BR',
    tags: ['software-development', 'java', 'algorithm'],
    conclusion: new Date('2022-7-18'),
    favorite: false,
  },
  {
    name: 'Microsoft AZ-900 parte 4: Azure Fundamentals',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/804c23fc-85e8-4bd2-9836-437c74a137a0?lang=pt_BR',
    tags: ['cloud-computing', 'azure'],
    conclusion: new Date('2022-7-7'),
    favorite: false,
  },
  {
    name: 'Microsoft AZ-900 parte 3: Azure Fundamentals',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/e4157be2-f56f-4559-8bdd-a21a0f012b0a?lang=pt_BR',
    tags: ['cloud-computing', 'azure'],
    conclusion: new Date('2022-7-5'),
    favorite: false,
  },
  {
    name: 'Microsoft AZ-900 parte 2: Azure Fundamentals',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/8e362b2b-9d79-43e8-88a8-36c199413ecf?lang=pt_BR',
    tags: ['cloud-computing', 'azure'],
    conclusion: new Date('2022-7-1'),
    favorite: false,
  },
  {
    name: 'Microsoft AZ-900 parte 1: Azure Fundamentals',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/fd708be3-4db2-4d76-b7fc-712d6cd43210?lang=pt_BR',
    tags: ['cloud-computing', 'azure'],
    conclusion: new Date('2022-6-29'),
    favorite: false,
  },
  {
    name: 'Git e Github: controle e compartilhe seu código',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/4f3c3358-1eae-432c-84b8-4a1fac6ecfcc?lang=pt_BR',
    tags: ['git'],
    conclusion: new Date('2022-6-24'),
    favorite: false,
  },
  {
    name: 'Go: validações, testes e páginas HTML',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/f57bdcd5-11f7-404e-9aeb-427af45eaca1?lang=pt_BR',
    tags: ['software-development', 'go', 'golang', 'google'],
    conclusion: new Date('2022-6-24'),
    favorite: false,
  },
  {
    name: 'Go: a linguagem do Google',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/1d0fc6df-f017-41ef-91a3-3b28084cef4f?lang=pt_BR',
    tags: ['software-development', 'go', 'golang', 'google'],
    conclusion: new Date('2022-5-27'),
    favorite: false,
  },
  {
    name: '.NET 5 e Identity: autenticando e autorizando usuários',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/af681830-f65c-4cea-a290-ec0ebe460365?lang=pt_BR',
    tags: ['software-development', '.net', 'csharp'],
    conclusion: new Date('2022-5-25'),
    favorite: false,
  },
  {
    name: '.NET 5 e Identity: implementando controle de usuário',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/0ebecc61-a94d-48a7-8cf3-17840664106c?lang=pt_BR',
    tags: ['software-development', '.net', ' csharp'],
    conclusion: new Date('2022-5-24'),
    favorite: false,
  },
  {
    name: 'Delegação de tarefas: obtenha o melhor do seu time',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/dbb9e726-e557-4ec1-bad4-ed92744ae45d?lang=pt_BR',
    tags: ['agile'],
    conclusion: new Date('2022-5-24'),
    favorite: false,
  },
  {
    name: 'Mindset Digital: técnicas e habilidades para liderança remota',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/cf8c4ebe-4b3c-419a-b30c-6992a675687a?lang=pt_BR',
    tags: ['agile'],
    conclusion: new Date('2022-5-24'),
    favorite: false,
  },
  {
    name: 'Princípios do trabalho em equipe: relações colaborativas',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/23dedc0c-b5d3-4fca-9b05-e42cc6f28e28?lang=pt_BR',
    tags: ['agile'],
    conclusion: new Date('2022-5-24'),
    favorite: false,
  },
  {
    name: 'Selenium WebDriver e C# parte 2: outros recursos',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/51ec0753-6343-459a-a83b-17afad4e57fe?lang=pt_BR',
    tags: ['software-development', '.net', ' csharp', 'software-testing'],
    conclusion: new Date('2022-5-22'),
    favorite: false,
  },
  {
    name: 'Selenium WebDriver e C# parte 1: testes da sua web app',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/ab2636e8-4bd9-483e-8a42-8da43b7f65f3?lang=pt_BR',
    tags: ['software-development', '.net', ' csharp', 'software-testing'],
    conclusion: new Date('2022-5-21'),
    favorite: false,
  },
  {
    name: 'Extreme Programming: metodologia de desenvolvimento ágil de software',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/fc26090e-5e5f-45ee-970b-5b8194e25c1d?lang=pt_BR',
    tags: ['agile'],
    conclusion: new Date('2022-5-19'),
    favorite: false,
  },
  {
    name: 'Testes em .NET: testes de interface usando Selenium',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/a9b65aba-b6da-47f6-b1f9-b4c5d580ab31?lang=pt_BR',
    tags: ['software-development', '.net', ' csharp', 'software-testing'],
    conclusion: new Date('2022-5-17'),
    favorite: false,
  },
  {
    name: 'Testes em .NET: integração e entrega contínua com Azure DevOps',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/85310144-c8be-40db-89c6-166a741a315a?lang=pt_BR',
    tags: ['software-development', '.net', ' csharp', 'software-testing'],
    conclusion: new Date('2022-5-16'),
    favorite: false,
  },
  {
    name: 'Testes em .NET: integrando a aplicação com um banco de dados',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/52fada6f-39a9-440c-8462-630f6770fe52?lang=pt_BR',
    tags: ['software-development', '.net', ' csharp', 'software-testing'],
    conclusion: new Date('2022-5-15'),
    favorite: false,
  },
  {
    name: 'Testes em .NET: testando software',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/b9ba25ed-660f-4b8e-a316-59543cd3373f?lang=pt_BR',
    tags: ['software-development', '.net', ' csharp', 'software-testing'],
    conclusion: new Date('2022-5-15'),
    favorite: false,
  },
  {
    name: 'Amazon EKS: gerenciando aplicações conteinerizadas com Kubernetes',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/dd427b1b-ae43-4d8e-ae50-66932d9b3228?lang=pt_BR',
    tags: ['cloud-computing', 'aws'],
    conclusion: new Date('2022-5-13'),
    favorite: false,
  },
  {
    name: 'Google Kubernetes Engine: avançando com GKE',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/38261f2f-775c-4391-a470-2dd4c23b1948?lang=pt_BR',
    tags: ['cloud-computing', 'google'],
    conclusion: new Date('2022-5-13'),
    favorite: false,
  },
  {
    name: 'Google Kubernetes Engine',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/21c6031d-7c50-4cca-85ea-2fb4ecf28421?lang=pt_BR',
    tags: ['cloud-computing', 'google'],
    conclusion: new Date('2022-5-12'),
    favorite: false,
  },
  {
    name: 'Kubernetes na digital-ocean: gerenciando aplicações conteinerizadas',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/9c51f887-3410-4bec-9003-9185c3107e20?lang=pt_BR',
    tags: ['cloud-computing', 'digital-ocean'],
    conclusion: new Date('2022-5-11'),
    favorite: false,
  },
  {
    name: 'Azure: gerencie Kubernetes com AKS e ACR',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/ca4b1404-eafb-48a3-b4fe-dad28ed9c6e2?lang=pt_BR',
    tags: ['cloud-computing', 'azure'],
    conclusion: new Date('2022-5-6'),
    favorite: false,
  },
  {
    name: 'Kubernetes: Deployments, Volumes e Escalabilidade',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/d6884d23-76b0-41d5-83a8-9d6971da7c39?lang=pt_BR',
    tags: ['kubernetes', 'docker-container'],
    conclusion: new Date('2022-5-3'),
    favorite: false,
  },
  {
    name: 'Kubernetes: Pods, Services e ConfigMaps',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/065f3e48-80b9-4f76-a2b9-081bf28b0f9c?lang=pt_BR',
    tags: ['kubernetes', 'docker-container'],
    conclusion: new Date('2022-5-2'),
    favorite: false,
  },
  {
    name: 'Hábitos na liderança: boas práticas',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/c4e8ef9b-1db8-4e54-9289-843e6e83f32a?lang=pt_BR',
    tags: ['all'],
    conclusion: new Date('2022-1-26'),
    favorite: false,
  },
  {
    name: 'Liderança: práticas de gestão e melhorias',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/df8ad090-4e64-4e89-b600-1753030d77f3?lang=pt_BR',
    tags: ['all'],
    conclusion: new Date('2022-1-26'),
    favorite: false,
  },
  {
    name: 'Liderança: aprendendo sobre a missão e propósito de liderar pessoas',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/252891f0-9e02-468f-a996-2e6d886dc7a4?lang=pt_BR',
    tags: ['all'],
    conclusion: new Date('2022-1-25'),
    favorite: false,
  },
  {
    name: 'Asp.NET Core: uma webapp usando o padrão MVC',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/38dec12f-dc83-4f70-910d-6a56a9a5bd0d?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2022-1-13'),
    favorite: false,
  },
  {
    name: 'Lógica de programação: laços e listas com JavaScript',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/1c93a2cb-a409-47a2-bbb7-37f417db1ec4?lang=pt_BR',
    tags: ['logic', 'javascript'],
    conclusion: new Date('2022-1-13'),
    favorite: false,
  },
  {
    name: 'Lógica de programação: comece em lógica com o jogo Pong e JavaScript',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/29ecd196-2c4a-4f67-ba63-a95f8af7b90e?lang=pt_BR',
    tags: ['logic', 'javascript'],
    conclusion: new Date('2022-1-6'),
    favorite: false,
  },
  {
    name: 'NGINX: servidor Web, Proxy Reverso e API Gateway',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/8a74ba78-4333-460c-aeea-41bdcc59ac8a?lang=pt_BR',
    tags: ['all'],
    conclusion: new Date('2021-9-23'),
    favorite: false,
  },
  {
    name: 'Microsserviços: padrões de projeto',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/1a8a1419-079c-45ea-a5a1-b085f395d62a?lang=pt_BR',
    tags: ['software-development', 'microservice'],
    conclusion: new Date('2021-9-17'),
    favorite: false,
  },
  {
    name: '.NET 5 e EF Core: relacionando entidades',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/4779bd73-714f-4631-a190-cf77e64b8f72?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2021-9-10'),
    favorite: false,
  },
  {
    name: 'API Rest com .NET 5: operações essenciais com verbos HTTP',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/569e52ad-945f-4436-90ee-24719cec0dc9?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2021-9-9'),
    favorite: false,
  },
  {
    name: 'Python: começando com a linguagem',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/5c274a8f-f2aa-48f5-bf4a-b36daf2d5ed6?lang=pt_BR',
    tags: ['software-development', 'python'],
    conclusion: new Date('2021-8-20'),
    favorite: false,
  },
  {
    name: '.Net e MongoDB parte 1: integre aplicações .NET',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/cf749f0e-95a4-4654-a1e5-5747e6f23d7e?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net', 'nosql', 'database'],
    conclusion: new Date('2021-8-6'),
    favorite: false,
  },
  {
    name: 'DNS: entenda a resolução de nomes na internet',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/66107344-c4a5-420c-b9ae-d42ce1c3455f?lang=pt_BR',
    tags: ['dns'],
    conclusion: new Date('2021-6-2'),
    favorite: false,
  },
  {
    name: 'C#: Eventos, Delegates e Lambda',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/057ba39e-d2c2-4eba-9fe0-a3cc1713767a?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2021-5-24'),
    favorite: false,
  },
  {
    name: 'C#: Paralelismo no mundo real',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/b8bdc2d2-d709-4c03-b905-6669cf22ce41?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2021-4-28'),
    favorite: false,
  },
  {
    name: 'C# Parte 9: entrada e saída (I/O) com streams',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/e4ee4e24-6a87-4d43-91b5-c42b39238832?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2021-4-26'),
    favorite: false,
  },
  {
    name: 'C# parte 8: List, lambda, linq',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/5b6328e1-45de-4e7d-b51e-c56ea346bc0c?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2021-4-23'),
    favorite: false,
  },
  {
    name: 'C# parte 7: Array e tipos genéricos',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/957cfc38-6039-4d9d-9111-7a67755a4b1a?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2021-4-21'),
    favorite: false,
  },
  {
    name: 'C# parte 6: Strings, expressões regulares e a classe Object',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/aa61efbc-4554-4a27-80cd-88d6bad8e68a?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2021-4-19'),
    favorite: false,
  },
  {
    name: 'C# parte 5: bibliotecas DLLs, documentação e usando o NuGet',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/e86e6535-543c-4db0-ae6a-59b02263cb9f?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2021-4-17'),
    favorite: false,
  },
  {
    name: 'C# parte 4: entendendo exceções',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/4e81e86d-d9eb-4dd5-990f-1fbbc4854ed8?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2021-3-22'),
    favorite: false,
  },
  {
    name: 'C# parte 3: entendendo herança e interface',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/eb3d4a38-50ba-4dbb-8082-4f6b75e558be?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2021-3-21'),
    favorite: false,
  },
  {
    name: 'C# parte 2: Entendendo a Orientação a Objetos',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/f34c4a9f-9084-4a0e-ae2f-a28c88cff0a2?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2021-3-9'),
    favorite: false,
  },
  {
    name: 'Vue.js parte 1: construindo Single Page Applications',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/41a2319c-2a51-4db8-afaa-611b4dd8f595?lang=pt_BR',
    tags: ['software-development'],
    conclusion: new Date('2021-2-24'),
    favorite: false,
  },
  {
    name: 'C# parte 1: primeiros passos',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/e66dac5c-2f3f-4ed3-bb3b-5b784749bc86?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2021-2-9'),
    favorite: false,
  },
  {
    name: 'Kafka: produtores, consumidores e streams',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/2fc0994c-98ce-4fb5-9473-2fed548ed3fd?lang=pt_BR',
    tags: ['all'],
    conclusion: new Date('2021-2-4'),
    favorite: false,
  },
  {
    name: 'Mocks em C#: testes de Integração com xUnit e Moq',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/31e4e9ef-f7cf-423f-977d-2cc1317fb29c?lang=pt_BR',
    tags: ['all'],
    conclusion: new Date('2020-12-9'),
    favorite: false,
  },
  {
    name: 'Scrum: agileidade em seu projeto',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/d8554a75-364a-471e-83de-6a43d6b2af5b?lang=pt_BR',
    tags: ['all'],
    conclusion: new Date('2020-11-30'),
    favorite: false,
  },
  {
    name: 'Agilidade: promovendo a transformação ágil',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/40ae2b6e-fa77-407c-b4db-55b0d2c3dfd0?lang=pt_BR',
    tags: ['all'],
    conclusion: new Date('2020-11-20'),
    favorite: false,
  },
  {
    name: 'SOLID com C#: princípios da programação orientada a objetos',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/7ad17dd8-69dd-47f4-a4b3-a9da4091cd8c?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net', 'solid'],
    conclusion: new Date('2020-10-22'),
    favorite: false,
  },
  {
    name: 'C#: Testes de unidade e TDD com xUnit',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/cb374d96-3f26-420b-8d20-9b01f72a7717?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2020-9-28'),
    favorite: false,
  },
  {
    name: 'Azure: Deploy de uma webapp na nuvem da Microsoft',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/25a5539c-faf6-40a5-a58a-19849c9ae8a3?lang=pt_BR',
    tags: ['azure'],
    conclusion: new Date('2020-9-17'),
    favorite: false,
  },
  {
    name: 'Deploy no Amazon EC2: alta disponibilidade e escalabilidade de uma aplicação',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/8541d344-2ff8-4109-ad7a-7b369f7d3f04?lang=pt_BR',
    tags: ['aws'],
    conclusion: new Date('2020-7-8'),
    favorite: false,
  },
  {
    name: 'LGPD: conhecendo e entendendo seus impactos',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/7c0cb1cd-87ea-4e0b-8886-75167e46a820?lang=pt_BR',
    tags: ['lgpd'],
    conclusion: new Date('2020-7-7'),
    favorite: false,
  },
  {
    name: 'APIs Rest com Asp.NET Core 2.1 Parte 3: padronizando a API',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/1e96ddd2-3e54-4b36-85fc-a5362c9731bc?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2020-5-22'),
    favorite: false,
  },
  {
    name: 'APIs Rest com Asp.NET Core 2.1 Parte 2: Consumindo nossa API',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/896c510e-9d59-4000-9fb8-49035f5d5fb9?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2020-5-13'),
    favorite: false,
  },
  {
    name: 'APIs Rest com Asp.NET Core 2.1 Parte 1: Da app MVC para API',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/806f4576-1de0-4173-8310-a3fd9a95b562?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2020-5-6'),
    favorite: false,
  },
  {
    name: 'APIs Rest com Asp.NET Core 2.1 Parte 2: Consumindo nossa API',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/896c510e-9d59-4000-9fb8-49035f5d5fb9?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2020-5-13'),
    favorite: false,
  },
  {
    name: 'APIs Rest com Asp.NET Core 2.1 Parte 1: Da app MVC para API',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/806f4576-1de0-4173-8310-a3fd9a95b562?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2020-5-6'),
    favorite: false,
  },
  {
    name: 'Entity Framework Core: banco de dados de forma eficiente',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/19f07f01-327f-40cb-b331-b0bf4d3ac26f?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2020-3-3'),
    favorite: false,
  },
  {
    name: 'Webpack: Manipulando módulos na sua webapp',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/decdd4b1-09e8-4776-a14a-3c9adff3136d?lang=pt_BR',
    tags: ['all'],
    conclusion: new Date('2020-1-20'),
    favorite: false,
  },
  {
    name: 'TypeScript parte 2: Mais técnicas e boas práticas',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/7e92f117-f13f-44c1-8dce-529ef65c7c02?lang=pt_BR',
    tags: ['software-development', 'typescript'],
    conclusion: new Date('2020-1-19'),
    favorite: false,
  },
  {
    name: 'TypeScript parte 1: evoluindo seu JavaScript',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/2eaf88e6-e655-4c9d-9803-ade895189378?lang=pt_BR',
    tags: ['software-development', 'typescript'],
    conclusion: new Date('2020-1-15'),
    favorite: false,
  },
  {
    name: 'Node.js Parte 1: Inovando com JavaScript no backend',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/7d24ef92-7bdd-47ee-b630-7311622dfd3e?lang=pt_BR',
    tags: ['software-development', 'node'],
    conclusion: new Date('2020-1-13'),
    favorite: false,
  },
  {
    name: 'JavaScript aprofundando em MVC, padrão Proxy e Factory',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/b03d047f-017b-4b44-b9c5-9937402b78aa?lang=pt_BR',
    tags: ['software-development', 'javascript', 'design-pattern'],
    conclusion: new Date('2020-1-7'),
    favorite: false,
  },
  {
    name: 'JavaScript conhecendo o Browser e padrões de projeto',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/88d168f0-6a8a-4b42-978f-d49cb9547c39?lang=pt_BR',
    tags: ['software-development', 'javascript', 'design-pattern'],
    conclusion: new Date('2020-1-4'),
    favorite: false,
  },
  {
    name: 'JavaScript programando na linguagem da web',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/f3125d22-e542-4101-b8f6-27f12fcc0c07?lang=pt_BR',
    tags: ['software-development', 'javascript'],
    conclusion: new Date('2019-12-14'),
    favorite: false,
  },
  {
    name: 'HTTP: Entendendo a web por baixo dos panos',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/5d54dc3e-3df3-4afb-84dc-159f33cdfb7b?lang=pt_BR',
    tags: ['http'],
    conclusion: new Date('2019-12-1'),
    favorite: false,
  },
  {
    name: 'ASP.NET Identity parte 1: Gerencie contas de usuários',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/37d80b3e-730a-4da2-bcc9-88ad25403458?lang=pt_BR',
    tags: ['software-development', 'csharp', '.net'],
    conclusion: new Date('2019-11-15'),
    favorite: false,
  },
  {
    name: 'Docker: Criando containers sem dor de cabeça',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/333f4ba7-4347-40dc-b835-f6537db07ecc?lang=pt_BR',
    tags: ['docker-container', 'docker-container'],
    conclusion: new Date('2019-11-6'),
    favorite: false,
  },
  {
    name: 'Node.js e terminal: dominando o ambiente de desenvolvimento front-end',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/279a0193-f327-4c54-a000-451aefd818bb?lang=pt_BR',
    tags: ['software-development', 'node'],
    conclusion: new Date('2024-7-20'),
    favorite: false,
  },
  {
    name: 'Node.js: criando uma API Rest com Express e MongoDB',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/certificate/b66c4012-ba60-46db-a044-1b2e923c01ed?lang=pt_BR',
    tags: ['software-development', 'node'],
    conclusion: new Date('2024-7-24'),
    favorite: false,
  },
  {
    name: 'Segurança Ofensiva',
    institution: InstitutionEnum.Alura,
    certificateUrl:
      'https://cursos.alura.com.br/degree/certificate/525ab812-85ca-4276-84f2-b3f0f1c09e67?lang=pt_BR',
    tags: ['security'],
    conclusion: new Date('2024-9-16'),
    favorite: false,
  },
];
