import { TestBed } from '@angular/core/testing';
import { ConfigService } from '@path-services/config.service';
import { provideConfigInitializer } from './startup';

describe('provideConfigInitializer', () => {
  it('deve recurperar as configurações', async () => {
    TestBed.configureTestingModule({
      providers: [
        // registra o initializer
        provideConfigInitializer(),

        // faz o mock do service ConfigService
        {
          provide: ConfigService,
          //useValue: {
          //	getData: jest.fn()
          //}
        },
      ],
    });

    // faz a injeção dos services
    const configService = TestBed.inject(ConfigService);

    // verifica se a função getData foi chamada
    expect(configService.getData).toHaveBeenCalled();
  });
});
