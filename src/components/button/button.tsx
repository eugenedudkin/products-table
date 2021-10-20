import React, { ReactElement } from 'react';
import './button.css';

interface IButton {
    text: string,
    className?: string,
    onClick?: any
}

const Button: React.FC<IButton> = (props): ReactElement => {
    const { text, ...buttonProps } = props; 
    return (
        <button {...buttonProps}>
            {text} 
        </button>
    )
}

export default Button;