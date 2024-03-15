import { ICourse } from "../interfaces/ICourse";

export const Courses: ICourse[] = [
  {
    name: "Iniciando com ASP.NET Core",
    institution: "Desenvolvedor.IO",
    certificateUrl: "https://desenvolvedor.io/curso/baixar-certificado/74c90a14-45bc-4748-a329-ff76b9f73c8b",
    tags:['development', 'microsoft', 'csharp', '.net'],
    conclusion: new Date('2023-12-4')
  },
  {
    name: "Projetando Arquiteturas em Três Camadas",
    institution: "Desenvolvedor.IO",
    certificateUrl: "https://desenvolvedor.io/curso/baixar-certificado/348ea229-b2b7-494c-b588-2bd6ed47f697",
    tags:['development', 'microsoft', 'csharp', '.net', 'architecture'],
    conclusion: new Date('2023-11-23')
  },
  {
    name: "Dominando o Kubernetes",
    institution: "Desenvolvedor.IO",
    certificateUrl: "https://desenvolvedor.io/curso/baixar-certificado/2339b4a9-588f-4356-93c0-208678c5489b",
    tags:['kubernetes', 'container'],
    conclusion: new Date('2023-8-8')
  },
  {
    name: "Fundamentos do C#",
    institution: "Desenvolvedor.IO",
    certificateUrl: "https://desenvolvedor.io/curso/baixar-certificado/668fdb1c-99e0-4e85-adf4-6b542f71f14e",
    tags:['development', 'microsoft', 'csharp', '.net'],
    conclusion: new Date('2023-1-16')
  },
  {
    name: "Dominando o Apache Kafka",
    institution: "Desenvolvedor.IO",
    certificateUrl: "https://desenvolvedor.io/curso/baixar-certificado/5813f9a2-8f15-4682-a239-183a679287ec",
    tags:['development', 'messagerie', 'amqp'],
    conclusion: new Date('2022-8-12')
  },
  {
    name: "Fundamentos de Arquitetura de Software",
    institution: "Desenvolvedor.IO",
    certificateUrl: "https://desenvolvedor.io/curso/baixar-certificado/633d37f3-f03f-40d4-a3b6-afd558ccf364",
    tags:['development', 'microsoft', 'csharp', '.net', 'architecture'],
    conclusion: new Date('2022-9-22')
  },
  {
    name: "Introdução ao DevOps",
    institution: "Desenvolvedor.IO",
    certificateUrl: "https://desenvolvedor.io/curso/baixar-certificado/bf3a9141-f47e-4d5e-8cca-3e2790245c31",
    tags:['devops'],
    conclusion: new Date('2022-9-19')
  },
  {
    name: "Desenvolvimento SPA com Angular",
    institution: "Desenvolvedor.IO",
    certificateUrl: "https://desenvolvedor.io/curso/baixar-certificado/bbb08bef-cc6a-4af1-ab89-36fc72fd2f70",
    tags:['development', 'angular', 'typescript', 'javascript'],
    conclusion: new Date('2022-8-31')
  },
  {
    name: "Fundamentos de Criptografia e Hashing",
    institution: "Desenvolvedor.IO",
    certificateUrl: "https://desenvolvedor.io/curso/baixar-certificado/3f08e65b-3f99-40d2-b2f7-3c92f04228b0",
    tags:['crypto', 'hash'],
    conclusion: new Date('2022-8-22')
  },
  {
    name: "Iniciando com ASP.NET Core",
    institution: "Desenvolvedor.IO",
    certificateUrl: "https://desenvolvedor.io/curso/baixar-certificado/f9a5fc5f-9bcf-4308-bf17-b0bde1e78378",
    tags:['development', 'microsoft', 'csharp', '.net', 'architecture'],
    conclusion: new Date('2021-11-4')
  },
  {
    name: "C# COMPLETO Programação Orientada a Objetos + Projetos",
    institution: "Udemy",
    certificateUrl: "https://www.udemy.com/certificate/UC-26OBZ64N",
    tags:['development', 'microsoft', 'csharp', '.net'],
    conclusion: new Date('2019-5-16')
  },
  {
    name: "C# - Aplicando Princípios SOLID na prática",
    institution: "Udemy",
    certificateUrl: "https://www.udemy.com/certificate/UC-70fa6e0e-c9fe-464a-bdbe-7881547c9779",
    tags:['development', 'microsoft', 'csharp', '.net'],
    conclusion: new Date('2022-6-22')
  },
  {
    name: "O curso completo de Banco de Dados e SQL, sem mistérios!",
    institution: "Udemy",
    certificateUrl: "https://www.udemy.com/certificate/UC-T3Y1X056",
    tags:['sql', 'microsoft', 'database', 'sqlserver', 'postgres'],
    conclusion: new Date('2019-6-6')
  },
  {
    name: "Azure Pipelines - CI/CD, Docker e Kubernetes no Azure DevOps",
    institution: "Udemy",
    certificateUrl: "https://www.udemy.com/certificate/UC-ca99013d-a26a-4121-bdde-dc6c44cc7663",
    tags:['devops', 'microsoft', 'kubernetes', 'docker', 'container'],
    conclusion: new Date('2021-8-19')
  },
  {
    name: "Event Driven Architecture - The Complete Guide",
    institution: "Udemy",
    certificateUrl: "https://www.udemy.com/certificate/UC-b711b1a6-8955-47a1-8b5c-bed43c73d0dd",
    tags:['architecture', 'development', 'software'],
    conclusion: new Date('2023-1-10')
  },
  {
    name: "Modelagem de Dados UML (Análise&Projeto Orientado a Objetos)",
    institution: "Udemy",
    certificateUrl: "https://www.udemy.com/certificate/UC-018f706e-7090-4b43-9b99-896142a53241",
    tags:['architecture', 'development', 'software', 'uml'],
    conclusion: new Date('2023-2-3')
  },
  {
    name: "Microsoft Azure Active Directory",
    institution: "Udemy",
    certificateUrl: "https://www.udemy.com/certificate/UC-72cf91c3-4f64-4674-b560-c4d20570733a",
    tags:['microsoft', 'azure', 'entraid'],
    conclusion: new Date('2022-11-3')
  },
  {
    name: "Azure Databases para Iniciantes",
    institution: "Udemy",
    certificateUrl: "https://www.udemy.com/certificate/UC-1629d9df-3184-41c5-83a4-943d89bf3910",
    tags:['microsoft', 'azure', 'sqlserver', 'database'],
    conclusion: new Date('2022-11-1')
  },
  {
    name: ".NET 5 e EF Core: relacionando entidades",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/4779bd73-714f-4631-a190-cf77e64b8f72?lang=pt_BR",
    tags:['microsoft', 'database', 'orm', 'entity framework', '.net'],
    conclusion: new Date('2021-7-10')
  },
  {
    name: ".NET 5 e Identity: autenticando e autorizando usuários",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/af681830-f65c-4cea-a290-ec0ebe460365?lang=pt_BR",
    tags:['microsoft', 'identity', '.net'],
    conclusion: new Date('2021-5-25')
  },
  {
    name: ".NET 5 e Identity: implementando controle de usuário",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/0ebecc61-a94d-48a7-8cf3-17840664106c?lang=pt_BR",
    tags:['microsoft', 'identity', '.net'],
    conclusion: new Date('2021-5-24')
  },
  {
    name: ".NET 6: criando uma web API",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/e5b315fd-973e-45b5-b4a7-44d1d609bc37?lang=pt_BR",
    tags:['microsoft', 'identity', '.net'],
    conclusion: new Date('2023-1-12')
  },
  {
    name: "API Rest com .NET 5: operações essenciais com verbos HTTP",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/569e52ad-945f-4436-90ee-24719cec0dc9?lang=pt_BR",
    tags:['microsoft', 'rest', '.net'],
    conclusion: new Date('2021-9-9')
  },
  {
    name: "Amazon EKS: gerenciando aplicações conteinerizadas com Kubernetes",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/dd427b1b-ae43-4d8e-ae50-66932d9b3228?lang=pt_BR",
    tags:['aws', 'cloud', 'kubernetes', 'container', 'eks'],
    conclusion: new Date('2022-5-13')
  },
  {
    name: "Agilidade: promovendo a transformação ágil",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/40ae2b6e-fa77-407c-b4db-55b0d2c3dfd0?lang=pt_BR",
    tags:['agil'],
    conclusion: new Date('2022-11-20')
  },
  {
    name: ".Net e MongoDB parte 1: integre aplicações .NET",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/cf749f0e-95a4-4654-a1e5-5747e6f23d7e?lang=pt_BR",
    tags:['all'],
    conclusion: new Date('2021-8-6')
  },
  {
    name: "Azure: Deploy de uma webapp na nuvem da Microsoft",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/25a5539c-faf6-40a5-a58a-19849c9ae8a3?lang=pt_BR",
    tags:['all'],
    conclusion: new Date('2020-9-17')
  },
  {
    name: "Azure Cloud: segurança e recursos avançados",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/ee5f9313-467b-44a5-ad05-b553b39d77b5?lang=pt_BR",
    tags:['all'],
    conclusion: new Date('2023-8-22')
  },
  {
    name: "Azure Cloud: criando um servidor com banco de dados para receber uma aplicação",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/57764ba5-ebeb-4195-9cdd-67e578bb5b2b?lang=pt_BR",
    tags:['all'],
    conclusion: new Date('2023-8-17')
  },
  {
    name: "ASP.NET Identity parte 1: Gerencie contas de usuários",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/37d80b3e-730a-4da2-bcc9-88ad25403458?lang=pt_BR",
    tags:['all'],
    conclusion: new Date('2019-9-15')
  },
  {
    name: "Asp.NET Core: uma webapp usando o padrão MVC",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/38dec12f-dc83-4f70-910d-6a56a9a5bd0d?lang=pt_BR",
    tags:['all'],
    conclusion: new Date('2022-1-13')
  },
  {
    name: "APIs Rest com Asp.NET Core 2.1 Parte 3: padronizando a API",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/1e96ddd2-3e54-4b36-85fc-a5362c9731bc?lang=pt_BR",
    tags:['all'],
    conclusion: new Date('2020-5-22')
  },
  {
    name: "APIs Rest com Asp.NET Core 2.1 Parte 2: Consumindo nossa API",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/896c510e-9d59-4000-9fb8-49035f5d5fb9?lang=pt_BR",
    tags:['all'],
    conclusion: new Date('2020-5-13')
  },
  {
    name: "APIs Rest com Asp.NET Core 2.1 Parte 1: Da app MVC para API",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/806f4576-1de0-4173-8310-a3fd9a95b562?lang=pt_BR",
    tags:['all'],
    conclusion: new Date('2020-5-6')
  },
  {
    name: "Azure: gerencie Kubernetes com AKS e ACR",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/ca4b1404-eafb-48a3-b4fe-dad28ed9c6e2?lang=pt_BR",
    tags:['all'],
    conclusion: new Date('2022-5-6')
  },
  {
    name: "C# parte 1: primeiros passos",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/e66dac5c-2f3f-4ed3-bb3b-5b784749bc86?lang=pt_BR",
    tags:['all'],
    conclusion: new Date('2021-2-9')
  },
  {
    name: "C# parte 2: Entendendo a Orientação a Objetos",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/f34c4a9f-9084-4a0e-ae2f-a28c88cff0a2?lang=pt_BR",
    tags:['all'],
    conclusion: new Date('2021-3-9')
  },
  {
    name: "C# parte 3: entendendo herança e interface",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/eb3d4a38-50ba-4dbb-8082-4f6b75e558be?lang=pt_BR",
    tags:['all'],
    conclusion: new Date('2021-3-21')
  },
  {
    name: "C# parte 4: entendendo exceções",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/4e81e86d-d9eb-4dd5-990f-1fbbc4854ed8?lang=pt_BR",
    tags:['all'],
    conclusion: new Date('2021-3-22')
  },
  {
    name: "C# parte 5: bibliotecas DLLs, documentação e usando o NuGet",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/e86e6535-543c-4db0-ae6a-59b02263cb9f?lang=pt_BR",
    tags:['all'],
    conclusion: new Date('2021-4-17')
  },
  {
    name: "C# parte 6: Strings, expressões regulares e a classe Object",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/aa61efbc-4554-4a27-80cd-88d6bad8e68a?lang=pt_BR",
    tags:['all'],
    conclusion: new Date('2021-4-19')
  },
  {
    name: "C# parte 7: Array e tipos genéricos",
    institution: "Alura",
    certificateUrl: "https://cursos.alura.com.br/certificate/957cfc38-6039-4d9d-9111-7a67755a4b1a?lang=pt_BR",
    tags:['all'],
    conclusion: new Date('2021-4-21')
  }
]
