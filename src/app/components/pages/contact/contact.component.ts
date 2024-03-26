import { Component, Input } from '@angular/core'
import { IProfile } from '../../../interfaces/IProfile'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  @Input({ required: true }) profiles: IProfile = {} as IProfile
  @Input({ required: false }) bglight: boolean = false

  currentClass: Record<string, boolean> = {
    'bg-light': this.bglight
  };

  asIsOrder(a: any, b: any) {
    return 1
  }

  calcularIdade = function calcularIdade(nascimento: Date) {
    // Obtém a idade em milissegundos
    var idadeDifMs = Date.now() - nascimento.getTime();

    // Converte os milissegundos em data e subtrai da era linux
    var idadeData = new Date(idadeDifMs);
    var idade = idadeData.getUTCFullYear() - 1970;

    return idade;
}
}
