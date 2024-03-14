import { ICourse } from "../interfaces/ICourse";

export const Courses: ICourse[] = [
  {
    name: "Desenvolvimento em Rust",
    institution: "Alura",
    certificateUrl: "https://www.alura.com",
    tags:['development', 'rust'],
    conclusion: new Date()
  },
  {
    name: "Desenvolvimento em Go",
    institution: "Desenvolvedor.IO",
    certificateUrl: "https://www.desenvolvedor.io",
    tags:['development', 'go'],
    conclusion: new Date()
  },
  {
    name: "Desenvolvimento em C#",
    institution: "Udemy",
    certificateUrl: "https://www.udemy.com.br",
    tags:['development', 'csharp'],
    conclusion: new Date()
  },
  {
    name: "Desenvolvimento em Angular",
    institution: "Udemy",
    certificateUrl: "https://www.udemy.com.br",
    tags:['development', 'angular', 'javascript', 'typescrypt'],
    conclusion: new Date()
  },
  {
    name: "Desenvolvimento em Java",
    institution: "Udemy",
    certificateUrl: "https://www.udemy.com.br",
    tags:['development', 'angular', 'java'],
    conclusion: new Date()
  }
]
