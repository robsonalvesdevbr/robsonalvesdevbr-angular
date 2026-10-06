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
    skills: ['C#', '.NET', '.NET Core', 'Go', 'Rust', 'TypeScript'],
  },
  {
    id: 'cloud',
    skills: ['Azure', 'AWS', 'GCP', 'Docker', 'Kubernetes'],
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
    skills: ['Oracle', 'SQL Server', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'practices',
    skills: [
      'Microservices',
      'Legacy modernization',
      'DevOps',
      'CI/CD',
      'Code review',
      'Technical leadership',
    ],
  },
];
