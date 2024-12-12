import { InstitutionEnum } from '@path-app/models/InstitutionEnum';
import { ImgcursoPipe } from './imgcurso.pipe';

describe('ImgcursoPipe', () => {
  let pipe: ImgcursoPipe;

  beforeEach(() => {
    pipe = new ImgcursoPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return correct image for Alura', () => {
    const result = pipe.transform(InstitutionEnum.Alura);
    expect(result).toBe('alura.jpg');
  });

  it('should return default image for unknown course', () => {
    const result = pipe.transform('Unknown' as any);
    expect(result).toBe('default.jpg');
  });
});
