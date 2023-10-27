import { ScreenSize } from "~/types";

export const getEditorheight = (screenSize: ScreenSize): number => {
  if (screenSize === ScreenSize.SMALL_DESKTOP) return 375;
  if (screenSize === ScreenSize.DESKTOP) return 700;
  return 500;
}
