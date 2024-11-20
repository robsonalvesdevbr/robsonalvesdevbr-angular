import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const elRefMock = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    const directive = new HighlightDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
