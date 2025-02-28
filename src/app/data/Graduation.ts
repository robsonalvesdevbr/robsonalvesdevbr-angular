import { IGraduation } from '@path-interfaces/IGraduation';
import { GraduationTagEnum } from '../models/GraduationTagEnum';

export const Graduations: IGraduation[] = [
  {
    name: 'PÓS GRADUAÇÃO FULLSTACK JAVASCRIPT',
    institution: 'Faculdade Cruzeiro Do Sul',
    conclusionDate: new Date(2022, 1),
    conclusion: 'completed',
    websiteInstituition: 'https://www.cruzeirodosulvirtual.com.br',
    tags: [GraduationTagEnum.FullStack, GraduationTagEnum.JavaScript],
  },
  {
    name: 'GRADUAÇÃO REDES DE COMPUTADORES',
    institution: 'Faculdade Tuiuti Do Paraná',
    conclusionDate: new Date(2012, 1),
    conclusion: 'completed',
    websiteInstituition: 'https://tuiuti.edu.br',
    tags: [GraduationTagEnum.Networking],
  },
  {
    name: 'GRADUAÇÃO DESENVOLVIMENTO WEB',
    institution: 'Faculdade De Tecnologia Opet',
    conclusionDate: new Date(2000, 1),
    conclusion: 'locked',
    websiteInstituition: 'https://www.opet.com.br',
  },
  {
    name: 'MBA - ARQUITETURA FULLCYCLE',
    institution: 'FullCycle',
    conclusionDate: new Date(2024, 1),
    conclusion: 'inprogress',
    websiteInstituition: 'https://fullcycle.com.br/',
  },
];
