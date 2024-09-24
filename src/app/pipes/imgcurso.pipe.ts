import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgcurso',
})
export class ImgcursoPipe implements PipeTransform {
  private imagens = new Map<string, string>([
    ['Desenvolvedor.IO', 'desenvolvedorio.jpg'],
    ['Alura', 'alura.jpg'],
    ['Udemy', 'udemy.png'],
    ['Linkedin Learning', 'linkedin.png'],
  ]);

  transform(curso: 'Alura' | 'Desenvolvedor.IO' | 'Udemy' | 'Linkedin Learning'): string {
    return this.imagens.get(curso) || 'default.jpg';
  }
}
