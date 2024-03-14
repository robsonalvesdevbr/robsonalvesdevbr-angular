import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgcurso'
})
export class ImgcursoPipe implements PipeTransform {

  imagens: {[key: string]: string} = {
    "Desenvolvedor.IO": "desenvolvedorio.jpg",
    "Alura": "alura.jpg",
    "Udemy": "udemy.png"
  }

  transform(curso: 'Alura' | 'Desenvolvedor.IO' | 'Udemy'): string {
    return this.imagens[curso];
  }

}
