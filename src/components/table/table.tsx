import './table.css';
import TableItem from '../table-item';
import { FC, useState } from 'react';
import THeader from './table-header';
import { ItemData } from '../../store/types';

type TableProps = {
    items: ItemData[]
}

const Table: FC<TableProps> = (props) => {

    const {items}  = props;
    const [column, setColumn] = useState<number>(0);
    const [increase, setIncrease] = useState<boolean>(false);
    const sortHandler = (e: { target: HTMLSpanElement }) => {
        const id = parseInt(e.target.id.replace(/[^0-9]/g, ""), 10);
        if (column !== id) {
            setIncrease(false);
            setColumn(id);
        } else {
            setIncrease((increase) => !increase)
        }
    };
    
    const sortFunc = (a: any, b: any) => {
        if (column === 1) {                                            
            const res = b.name > a.name ? -1 : 1
            return increase ? res : -res
        }
        if (column === 2) {                 
            const res = b.price - a.price
            return increase ? res : -res
        }
        return 0;
    };

    const sortedList = items.sort(sortFunc);

    return (
        <table className="table">
            <thead>
                <tr>
                    <THeader
                        id={`th-${1}`}
                        name={"Name"}
                        sortHandler={sortHandler}
                        increase={increase && column === 1}
                        sortIsActive={column === 1} />
                    <THeader
                        id={`th-${2}`}
                        name={"Price"}
                        sortHandler={sortHandler}
                        increase={increase && column === 2}
                        sortIsActive={column === 2} />
                    <th>Actions</th>
                </tr>              
            </thead>
            <tbody>
                {sortedList.map((item: ItemData, index: number) => {
                    return (
                        <TableItem 
                            itemData={item} 
                            key={index}/>
                    )
                })}                
            </tbody>
        </table>
    )
};

export default Table;