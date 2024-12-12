import { InstitutionEnum } from '@path-app/models/InstitutionEnum';

export interface ICourse {
  name: string;
  institution: InstitutionEnum;
  tags: string[];
  certificateUrl: string | undefined | null;
  conclusion: Date | undefined | null;
  favorite: boolean;
}
