export interface ICourse {
  name: string
  institution: 'Alura' | 'Desenvolvedor\u002eIO' | 'Udemy' | 'Linkedin Learning'
  tags: string[]
  certificateUrl: string | undefined | null
  conclusion: Date | undefined | null
  favorite: boolean
}
