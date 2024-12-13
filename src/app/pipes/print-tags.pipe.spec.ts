import { PrintTagsPipe } from './print-tags.pipe';

describe('PrintTagsPipe', () => {
  let pipe: PrintTagsPipe;

  beforeEach(() => {
    pipe = new PrintTagsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return a string with tags separated by commas', () => {
    const tags = ['angular', 'pipe', 'test'];
    expect(pipe.transform(tags)).toEqual('angular , pipe , test');
  });
});
