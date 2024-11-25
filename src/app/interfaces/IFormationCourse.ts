export interface IFormationCourse {
  name: string
  institution: 'Alura' | 'Desenvolvedor\u002eIO' | 'Udemy'
  tags: string[]
  certificateUrl: string | undefined | null
  conclusion: Date | undefined | null
  favorite: boolean
}
