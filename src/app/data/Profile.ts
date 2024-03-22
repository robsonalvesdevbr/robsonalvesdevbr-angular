import { IProfile } from '../interfaces/IProfile'

export const Profile: IProfile = {
  name: 'Robson Candido dos Santos Alves',
  country: 'Brasil',
  state: 'Paraná',
  city: 'Curitiba',
  email: 'contato@robsonalves.dev.br',
  birthday: new Date('1980-8-29'),
  urlList: new Map<string, string>([
    ['WebSite', 'https://www.robsonalves.dev.br'],
    ['LinkedIn', 'https://www.linkedin.com/in/robson-curitiba'],
    ['GitHub', 'https://github.com/robsonalvesdev'],
    ['Código fonte desta página', 'https://github.com/robsonalvesdev/robsonalvesdevbr-angular17'],
  ]),
}
