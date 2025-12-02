import { IGraduation } from '@path-interfaces/IGraduation';
import { GraduationTagEnum } from '../models/GraduationTagEnum';

export const Graduations: IGraduation[] = [
  // ===== EM ANDAMENTO =====
  {

    id: 'graduacao-pos-goexpert-fullcycle',
    name: 'PÓS - GO EXPERT',
    institution: 'FullCycle',
    conclusionDate: new Date(2025, 12),
    conclusion: 'inprogress',
    websiteInstituition: 'https://fullcycle.com.br/',
  },
  {

    id: 'graduacao-mba-arquitetura-fullcycle-fullcycle',
    name: 'MBA - ARQUITETURA FULLCYCLE',
    institution: 'FullCycle',
    conclusionDate: new Date(2024, 1),
    conclusion: 'inprogress',
    websiteInstituition: 'https://fullcycle.com.br/',
  },

  // ===== CONCLUÍDAS =====
  {

    id: 'graduacao-pos-graduacao-fullstack-javascript-faculdade-cruzeiro-d',
    name: 'PÓS GRADUAÇÃO FULLSTACK JAVASCRIPT',
    institution: 'Faculdade Cruzeiro Do Sul',
    conclusionDate: new Date(2022, 1),
    conclusion: 'completed',
    websiteInstituition: 'https://www.cruzeirodosulvirtual.com.br',
    tags: [GraduationTagEnum.FullStack, GraduationTagEnum.JavaScript],
  },
  {

    id: 'graduacao-graduacao-redes-de-computadores-faculdade-tuiuti-do-',
    name: 'GRADUAÇÃO REDES DE COMPUTADORES',
    institution: 'Faculdade Tuiuti Do Paraná',
    conclusionDate: new Date(2012, 1),
    conclusion: 'completed',
    websiteInstituition: 'https://tuiuti.edu.br',
    tags: [GraduationTagEnum.Networking],
  },

  // ===== TRANCADAS =====
  {

    id: 'graduacao-graduacao-desenvolvimento-web-faculdade-de-tecnolo',
    name: 'GRADUAÇÃO DESENVOLVIMENTO WEB',
    institution: 'Faculdade De Tecnologia Opet',
    conclusionDate: new Date(2000, 1),
    conclusion: 'locked',
    websiteInstituition: 'https://www.opet.com.br',
  },
];
