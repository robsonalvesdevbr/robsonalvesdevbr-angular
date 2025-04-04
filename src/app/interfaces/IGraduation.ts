import { GraduationTagEnum } from '@path-app/models/GraduationTagEnum';

export interface IGraduation {
  name: string;
  institution: string;
  conclusionDate: Date | undefined | null;
  conclusion: 'completed' | 'locked' | 'inprogress';
  websiteInstituition: string | undefined | null;
  tags?: GraduationTagEnum[];
}
