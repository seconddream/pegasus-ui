import Tooltip from "../Tooltip";
import ButtonBase, { ButtonBaseProps } from "./ButtonBase";
import { WithPlacement } from "../../shared/interfaces";

export interface ButtonProps extends ButtonBaseProps, WithPlacement{
  tooltips?: string
}

export default function Button(props: ButtonProps){
  const {tooltips, position, ...bottonBaseProps} = props
  if(tooltips){
    return <Tooltip text={tooltips} position={position}><ButtonBase {...bottonBaseProps} /></Tooltip>
  }else{
    return <ButtonBase {...bottonBaseProps} />
  }
}