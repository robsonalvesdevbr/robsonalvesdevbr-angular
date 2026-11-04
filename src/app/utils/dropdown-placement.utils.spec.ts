import { dropdownPlacement } from './dropdown-placement.utils';

describe('dropdownPlacement', () => {
  it('on very narrow screens sits just below the button and is not right-aligned', () => {
    expect(dropdownPlacement({ bottom: 40, right: 300 }, 399)).toEqual({ top: '42px', alignRight: false });
  });

  it('on normal screens uses the default top and aligns right when there is room', () => {
    expect(dropdownPlacement({ bottom: 40, right: 100 }, 400)).toEqual({ top: '100%', alignRight: true });
  });

  it('does not align right when the space on the right is under 196px', () => {
    expect(dropdownPlacement({ bottom: 40, right: 500 }, 695)).toEqual({ top: '100%', alignRight: false });
  });

  it('aligns right when the space on the right is exactly 196px', () => {
    expect(dropdownPlacement({ bottom: 40, right: 500 }, 696)).toEqual({ top: '100%', alignRight: true });
  });
});
