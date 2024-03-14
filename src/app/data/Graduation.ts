import { IGraduation } from './../interfaces/IGraduation';

export const Graduations: IGraduation[] = [
  {
    name: 'PÓS GRADUAÇÃO FULLSTACK JAVASCRIPT',
    institution: 'Faculdade Cruzeiro Do Sul',
    conclusionDate: new Date(2022, 1),
    conclusion: true,
    websiteInstituition: 'https://www.cruzeirodosulvirtual.com.br'
  },
  {
    name: 'REDES DE COMPUTADORES',
    institution: 'Faculdade Tuiuti Do Paraná',
    conclusionDate: new Date(2012, 1),
    conclusion: true,
    websiteInstituition: 'https://tuiuti.edu.br'
  },
  {
    name: 'DESENVOLVIMENTO WEB',
    institution: 'Faculdade De Tecnologia Opet',
    conclusionDate: new Date(2000, 1),
    conclusion: false,
    websiteInstituition: 'https://www.opet.com.br'
  }
]
