import { ChangeEvent, FC } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './item-filter.css';
import Button from '../button';

const ItemFilter: FC = () => {

    const [searchStr, setSearchStr] = useState<string>("");

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchStr(e.target.value)
    };

    const urlStr: string = encodeURI(`/search?q=${searchStr}`);

    return (
            <div className="filter-container">
                <input 
                    className="input" 
                    type="text"
                    placeholder="Введите название товара"
                    onChange={searchHandler}
                    />
                <Link 
                    className='' 
                    to={urlStr}>
                    <Button
                        className="default" text="Искать" />
                </Link>               
            </div>
    )
}

export default ItemFilter;