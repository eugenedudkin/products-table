import React, { ChangeEvent, FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import './item-filter.css';
import Button from '../button';

const ItemFilter: FC = () => {

    const history = useHistory();
    const [searchStr, setSearchStr] = useState<string>("");
    const urlStr: string = encodeURI(`/search?q=${searchStr}`);

    const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchStr(e.target.value)
    };
    
    const keyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") searchHandler();
    };

    const searchHandler = () => {
        searchStr !== "" ? history.push(urlStr) : history.push("")
    };

    return (
            <div className="filter-container">
                <input 
                    className="input" 
                    type="text"
                    placeholder="Введите название товара"
                    onKeyDown={keyHandler}
                    onChange={searchInputHandler}
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