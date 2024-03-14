import { IBook } from "../interfaces/IBook";

export const Books: IBook[] = [
  {
    title: "ARQUITETURA ORIENTADA A EVENTOS",
    subtitle: "Soluções escaláveis e em tempo real com EDA",
    author: ["Roberto Picanço"],
    publishName: "Casa do Codigo",
    publishYear: 2023,
    tags: ['architecture', 'software'],
    bookUrl: "https://www.casadocodigo.com.br/products/livro-eda"
  },
  {
    title: "SCRUM",
    subtitle: "Gestão ágil para produtos de sucesso",
    author: ["Rafael Sabbagh"],
    publishName: "Casa do Codigo",
    publishYear: 2022,
    tags: ['scrun', 'agil'],
    bookUrl: "https://www.casadocodigo.com.br/products/livro-scrum?_pos=1&_sid=159bb5a2e&_ss=r"
  },
  {
    title: "RUST",
    subtitle: "Concorrência e alta performance com segurança",
    author: ["Marcelo Castellani", "Willian Molinari"],
    publishName: "Casa do Codigo",
    publishYear: 2022,
    tags: ['development', 'rust'],
    bookUrl: "https://www.casadocodigo.com.br/products/livro-rust"
  },
  {
    title: "MERGULHO NOS PADRÔES DE PROJETOS",
    subtitle: "Concorrência e alta performance com segurança",
    author: ["Alexander Shvets"],
    publishName: "Autoral",
    publishYear: 2022,
    tags: ['development', 'rust', 'design pattern', 'solid'],
    bookUrl: "https://refactoring.guru/pt-br/design-patterns/book"
  }
]
