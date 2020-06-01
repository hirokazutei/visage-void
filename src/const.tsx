import { CoverType, SizeKey } from "./types";

export const SIZE: { [key in SizeKey]: number } = {
  tiny: 4,
  small: 8,
  medium: 12,
  large: 16,
  huge: 24,
  macro: 36,
};

export const COVER_TYPE: Array<CoverType> = ["BOX", "OVAL"];
