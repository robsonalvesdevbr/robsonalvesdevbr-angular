export interface ICourse {
  name: string
  institution: 'Alura' | 'Desenvolvedor.IO' | 'Udemy' | 'Linkedin Learning'
  tags: string[]
  certificateUrl: string | undefined | null
  conclusion: Date | undefined | null
  favorite: boolean
}
