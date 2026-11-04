export const DROPDOWN_WIDTH = 180;
const NARROW_VIEWPORT = 400;
const RIGHT_MARGIN = 16;

export interface DropdownPlacement {
  readonly top: string;
  readonly alignRight: boolean;
}

export function dropdownPlacement(
  button: { readonly bottom: number; readonly right: number },
  viewportWidth: number,
): DropdownPlacement {
  if (viewportWidth < NARROW_VIEWPORT) {
    return { top: `${button.bottom + 2}px`, alignRight: false };
  }
  const spaceOnRight = viewportWidth - button.right;
  return { top: '100%', alignRight: spaceOnRight >= DROPDOWN_WIDTH + RIGHT_MARGIN };
}
