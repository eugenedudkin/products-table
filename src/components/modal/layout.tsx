import { FC } from 'react';
import './modal.css'

const Layout: FC<ILayoutProps> = ({ active }) => {
    
    return (
        <div 
            className={active ? "modal active" : "modal off" }
            onClick={e => e.preventDefault()}> 
        </div>
    )
}                                                                   

export default Layout;

interface ILayoutProps {
    active: boolean;
    clickHandler?: React.MouseEventHandler<HTMLDivElement>
}
