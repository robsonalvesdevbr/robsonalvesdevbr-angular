import { ISkillGroup } from '@path-interfaces/ISkillGroup';

export const SkillGroups: ISkillGroup[] = [
  {
    id: 'platforms',
    skills: ['C#', '.NET', '.NET Core', 'Delphi'],
  },
  {
    id: 'cloud',
    skills: ['Azure', 'AWS', 'Docker', 'Kubernetes'],
  },
  {
    id: 'messaging',
    skills: ['RabbitMQ'],
  },
  {
    id: 'observability',
    skills: ['DataDog', 'Grafana'],
  },
  {
    id: 'data',
    skills: ['Oracle', 'SQL Server'],
  },
  {
    id: 'practices',
    skills: ['Microservices', 'Legacy modernization', 'DevOps', 'Code review'],
  },
];
