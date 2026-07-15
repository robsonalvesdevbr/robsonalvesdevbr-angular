import { getPublisherLogo } from './PublisherLogo';
import { PublishNameEnum } from '@path-app/models/PublishNameEnum';

describe('getPublisherLogo', () => {
  it('should return the mapped logo for a known publisher', () => {
    expect(getPublisherLogo(PublishNameEnum.CasaDoCodigo)).toBe(
      'assets/img/publishers/casa_do_cdigo_logo.jpeg'
    );
  });

  it('should return the default logo for an unmapped publisher', () => {
    expect(getPublisherLogo('unknown' as PublishNameEnum)).toBe('assets/img/others/livro.jpg');
  });
});
