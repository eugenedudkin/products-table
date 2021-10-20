import './search-panel.css';

import ItemFilter from '../item-filter';
import Button from '../button';

import { useSelector } from 'react-redux';
import { useModal } from '../modal/modalProvider';
import ItemDetails from '../item-details';
import { FC } from 'react';
import { RootState } from '../../store/index';
import { ItemData } from '../../store/types';
const SearchPanel: FC = () => {

    const { openModal, closeModal } = useModal();
    const newID = 1 + Math.max.apply(
        null, 
        useSelector((state: RootState) => state.items.map((item: ItemData) => item.id))
    );
    const clickHandler = () => {
        openModal(ItemDetails, {id: newID, close: closeModal})
    };

    return (
        <div className="search-container">
            <ItemFilter />
            <Button 
                className="default right" 
                text="Add new" 
                onClick={clickHandler}/>
        </div>
    )
}

export default SearchPanel;