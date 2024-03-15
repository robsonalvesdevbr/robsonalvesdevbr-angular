export interface IFormationCourse {
  name: string;
  institution: 'Alura' | 'Desenvolvedor.IO' | 'Udemy';
  tags: string[];
  certificateUrl: string | undefined | null;
  conclusion: Date | undefined | null;
  favorite: boolean;
}
