import { Pipe, PipeTransform } from '@angular/core'
import { InstitutionEnum } from '@path-app/models/InstitutionEnum'

@Pipe({
  name: 'imgcurso',
  standalone: true,
})
export class ImgcursoPipe implements PipeTransform {
  private readonly imagens = new Map<string, string>([
    ['Desenvolvedor\u002eIO', 'desenvolvedorio.jpg'],
    ['Alura', 'alura.jpg'],
    ['Udemy', 'udemy.png'],
    ['Linkedin Learning', 'linkedin.png'],
  ])

  transform(curso: InstitutionEnum): string {
    return this.imagens.get(curso) ?? 'default.jpg'
  }
}
