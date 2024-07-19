export interface IBook {
  title: string
  subtitle: string
  author: string[]
  publishName: string
  publishYear: number
  tags: string[]
  bookUrl: string | undefined | null
  pages: number
  progress: number
  favorite: boolean
}
