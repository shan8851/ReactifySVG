import { SvgState } from "~/types";
import { Cross } from "./cross";
import { Checkmark } from "./checkmark";
import { Idle } from "./idle";
import { Loading } from "./loading";

type SvgStateIconProps = {
  svgState: SvgState
}

export const SvgStateIcon = ({ svgState }:SvgStateIconProps) => {
  const iconClass = "w-24 h-24 self-center";
  const renderIcon = svgState === SvgState.SUCCESS ? <Checkmark className={iconClass} /> : svgState === SvgState.ERROR ? <Cross className={iconClass} /> : svgState === SvgState.LOADING ? <Loading className={`${iconClass} animate-spin fill-typography`} /> : <Idle className={`${iconClass} stroke-typography`} />

  return renderIcon;
}
