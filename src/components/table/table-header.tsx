import { FC } from "react";

const THeader: FC<TheaderProps> = (props) => {
    
    const { name, increase, sortIsActive, sortHandler, ...otherProps } = props;
    return (
        <th>
            <span>{name}</span>
            <span 
                {...otherProps}
                onClick={sortHandler}
                className={sortIsActive? "sort-icon active" : "sort-icon"}>
                {increase ? "▲" : "▼"}
            </span>
        </th>
    )
}

export default THeader;

type TheaderProps = {
    id: string
    name: string
    sortHandler: any
    increase: boolean
    sortIsActive: boolean
}
