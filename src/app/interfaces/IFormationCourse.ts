import { InstitutionEnum } from '@path-app/models/InstitutionEnum';

export interface IFormationCourse {
  name: string;
  institution: InstitutionEnum;
  tags: string[];
  certificateUrl: string | undefined | null;
  conclusion: Date | undefined | null;
  favorite: boolean;
}
