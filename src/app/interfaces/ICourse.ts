export interface ICourse {
  name: string;
  institution: 'Alura' | 'Desenvolvedor.IO' | 'Udemy';
  tags: string[] | undefined | null;
  certificateUrl: string | undefined | null;
  conclusion: Date | undefined | null;
}
