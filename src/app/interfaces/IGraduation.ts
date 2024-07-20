export interface IGraduation {
  name: string
  institution: string
  conclusionDate: Date | undefined | null
  conclusion: 'Concluído' | 'Trancado' | 'Em andamento'
  websiteInstituition: string | undefined | null
}
