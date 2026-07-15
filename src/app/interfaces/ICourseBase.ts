import { InstitutionEnum } from '@path-app/models/InstitutionEnum';

export interface ICourseBase<TTag extends string> {
  id: string;
  name: string;
  institution: InstitutionEnum;
  tags: TTag[];
  certificateUrl: string | undefined | null;
  conclusion: Date | undefined | null;
  favorite: boolean;
}
