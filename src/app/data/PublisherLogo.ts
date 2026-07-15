import { PublishNameEnum } from '@path-app/models/PublishNameEnum';

const PUBLISHER_LOGO_MAP: Partial<Record<PublishNameEnum, string>> = {
  [PublishNameEnum.CasaDoCodigo]: 'assets/img/publishers/casa_do_cdigo_logo.jpeg',
  [PublishNameEnum.Novatec]: 'assets/img/publishers/novatec_editora_logo.jpeg',
  [PublishNameEnum.Packts]: 'assets/img/publishers/packt_publishing_logo.jpeg',
  [PublishNameEnum.Elsevier]: 'assets/img/publishers/elsevier_logo.jpeg',
  [PublishNameEnum.AltaBooks]: 'assets/img/publishers/editora_alta_books_logo.jpeg',
  [PublishNameEnum.Bookman]: 'assets/img/publishers/bookman_logo.jpeg',
  [PublishNameEnum.MicrosoftPress]: 'assets/img/publishers/microsoft_press_logo.jpeg',
  [PublishNameEnum.Wrox]: 'assets/img/publishers/wrox_logo.jpeg',
  [PublishNameEnum.DCComics]: 'assets/img/publishers/dc_comics_logo.jpeg',
  [PublishNameEnum.PortfolioPenguin]: 'assets/img/publishers/portfolio_penguin_logo.jpeg',
  [PublishNameEnum.Campus]: 'assets/img/publishers/campus_logo.svg',
  [PublishNameEnum.CienciaModerna]: 'assets/img/publishers/ciencia_moderna_logo.svg',
  [PublishNameEnum.VisualBooks]: 'assets/img/publishers/visual_books_logo.svg',
  [PublishNameEnum.MakronBooks]: 'assets/img/publishers/makron_books_logo.svg',
};

const DEFAULT_PUBLISHER_LOGO = 'assets/img/others/livro.jpg';

export function getPublisherLogo(publishName: PublishNameEnum): string {
  return PUBLISHER_LOGO_MAP[publishName] || DEFAULT_PUBLISHER_LOGO;
}
