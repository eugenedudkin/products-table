import { FC } from "react";

const InputItem: FC<InputItemProps> = (props) => {
    const { itemValue, type, className, givenRef, ...inputProps } = props;
    const markType: MarkType = type === "checkbox" ? "checkbox" : "radio"
    return (
      <label key={itemValue} className={`label-container ${className}`}>
        
        <input
          ref={givenRef}
          type={markType}
          name="city"
          className="input-item"
          value={itemValue}
          {...inputProps}
          />
        <span className={`mark ${markType}mark`}></span>
        {itemValue}
      </label>
    )
  }
  
  type InputItemProps = {
    itemValue: string;
    type: string;
    [key: string]: any;
  }
  type MarkType = "checkbox" | "radio"

  export default InputItem;