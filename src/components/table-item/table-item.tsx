import Button from "../button";
import './table-item.css'
import { useDispatch } from 'react-redux';
import { deleteItem } from "../../store/dataReducer";
import Confirm from "../confirm";
import { useModal } from '../modal/modalProvider';
import ItemDetails from "../item-details";
import { ItemData } from '../../store/types';
import { FC } from "react";

type TableItemProps = {
    itemData: ItemData;
    key: number;
}

const TableItem: FC<TableItemProps> = ({itemData}: TableItemProps) => {

    const dispatch = useDispatch();
    const {name, id, price} = itemData;

    const currencyPrice = new Intl.NumberFormat(
        'en-US', 
        { style: "currency", currency: "USD" }
    ).format(price);

    const { openModal, closeModal } = useModal();
    const onOk = () => dispatch(deleteItem(id));
    const confirmText: string = `Вы действительно хотите удалить ${name}?`;

    const editHandler = () => {
        const editProps = {id, close: closeModal};
        openModal(ItemDetails, editProps);

    };
    const deleteHandler = () => {
        const delProps = {close: closeModal, onOk, confirmText};
        openModal(Confirm, delProps); 
    };

    return (
        <tr>
            <td>
                <div className="cell">
                    <div>
                        <p className="itemTag" onClick={editHandler}>{itemData.name}</p>                       
                    </div>
                    <div className="quantity">
                        {itemData.quantity}
                    </div>
                </div>
                
            </td>
            <td>{currencyPrice}</td>
            <td>
                <div className="cell">
                    <Button onClick={editHandler} className="default edit" text="Edit" />
                    <Button onClick={deleteHandler} className="default delete" text="Delete" /> 
                </div>
                
            </td>
        </tr>
    )
};

export default TableItem;

