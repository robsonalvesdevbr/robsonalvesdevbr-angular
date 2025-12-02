import { GraduationTagEnum } from '@path-app/models/GraduationTagEnum';

export interface IGraduation {
  id: string;
  name: string;
  institution: string;
  conclusionDate: Date | undefined | null;
  conclusion: 'completed' | 'locked' | 'inprogress';
  websiteInstituition: string | undefined | null;
  tags?: GraduationTagEnum[];
  institutionLogo?: string;
}
