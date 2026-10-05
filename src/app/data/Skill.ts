import { ISkillGroup } from '@path-interfaces/ISkillGroup';

export const SkillGroups: ISkillGroup[] = [
  {
    id: 'architecture',
    skills: [
      'Software Architecture',
      'System Design',
      'Clean Architecture',
      'Domain-Driven Design',
      'Event-Driven Architecture',
      'Distributed Systems',
    ],
  },
  {
    id: 'platforms',
    skills: ['C#', '.NET', '.NET Core', 'Go'],
  },
  {
    id: 'cloud',
    skills: ['Azure', 'AWS', 'Docker', 'Kubernetes'],
  },
  {
    id: 'messaging',
    skills: ['Kafka', 'RabbitMQ'],
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
