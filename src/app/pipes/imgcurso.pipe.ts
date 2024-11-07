import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'imgcurso',
  standalone: true,
})
export class ImgcursoPipe implements PipeTransform {
  private readonly imagens = new Map<string, string>([
    ['Desenvolvedor.IO', 'desenvolvedorio.jpg'],
    ['Alura', 'alura.jpg'],
    ['Udemy', 'udemy.png'],
    ['Linkedin Learning', 'linkedin.png'],
  ])

  transform(curso: 'Alura' | 'Desenvolvedor.IO' | 'Udemy' | 'Linkedin Learning'): string {
    return this.imagens.get(curso) ?? 'default.jpg'
  }
}
