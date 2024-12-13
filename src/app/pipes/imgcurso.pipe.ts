import { Pipe, PipeTransform } from '@angular/core';
import { InstitutionEnum } from '@path-app/models/InstitutionEnum';

@Pipe({
  name: 'imgcurso',
  standalone: true,
})
export class ImgcursoPipe implements PipeTransform {
  private readonly imagens = new Map<InstitutionEnum, string>([
    [InstitutionEnum.DesenvolvedorIO, 'desenvolvedorio.jpg'],
    [InstitutionEnum.Alura, 'alura.jpg'],
    [InstitutionEnum.Udemy, 'udemy.png'],
    [InstitutionEnum.LinkedinLearning, 'linkedin.png'],
  ]);

  transform(curso: InstitutionEnum): string {
    return this.imagens.get(curso) ?? 'default.jpg';
  }
}
