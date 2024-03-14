export interface IGraduation {
  name: string;
  institution: string;
  conclusionDate: Date | undefined | null;
  conclusion: boolean;
  websiteInstituition: string | undefined | null;
}
