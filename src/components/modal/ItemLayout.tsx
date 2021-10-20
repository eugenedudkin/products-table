import { FC } from 'react';
import './modal.css';

const ItemLayout: FC = ({children}: any) => {
    return (
        <div className="blur">
            {children}
        </div>
    )
}

export default ItemLayout;