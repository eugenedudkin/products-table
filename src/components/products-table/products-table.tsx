import Table from "../table";
import SearchPanel from "../search-panel";
import { FC, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { RootState } from "../../store";
import { ItemData } from "../../store/types";
import './products-table.css'
import { useParams } from "react-router-dom";
import { useModal } from "../modal/modalProvider";
import ItemDetails from "../item-details";

const ProductsTable: FC = () => {
    let history = useHistory();


    const [loading, setLoading] = useState(true);

    const { id } = useParams<any>();
    const { openModal, closeModal } = useModal();

    const queryString: string = useLocation().search;
    const queryData = convertQueryToObject(queryString);
    const { q: searchStr = "" } = queryData;

    const items: ItemData[] = useSelector((state: RootState) => state.items)
    const filteredData = !!searchStr 
        ? items.filter((item: ItemData) => item.name.includes(searchStr))
        : items;

    const isIdValid = items.filter((item: ItemData) => item.id === +id).length > 0

    const openIdModal = () => {
        const editProps = {id: +id, close: closeModal};
        openModal(ItemDetails, editProps);
    }

    useEffect(() => {
        if (loading && items.length !== 0) {
            setLoading(false)
        }
    }, [items.length, loading])

    useEffect(() => {
        if (!!id && !loading) {isIdValid ? openIdModal() : history.push("/error")}
    // eslint-disable-next-line
    }, [loading])
    
    return (
        <div className="productsTable">
            <SearchPanel />
            {!!searchStr && <ResultsTitle searchStr={searchStr}/>}
            {filteredData.length !== 0 
                && <Table 
                        items={filteredData }
                        />}
            {filteredData.length === 0 && !loading && <p>Ничего не найдено</p>}
            {loading && "Loading..."}
        </div>
    )
}

export default ProductsTable;

const ResultsTitle: FC<{searchStr: string}> = (props: {searchStr: string}) => {
    const {searchStr} = props;
    return (
        <div>
            {`Результаты поиска по запросу "${searchStr}":`}
        </div>
    )
}

const convertQueryToObject: IConvertQtoO = (url) => {
    const encoded = decodeURI(url);
    const arr = encoded.slice(1).split(/&|=/);
    const params: {[key: string]: string} = {};

    for (let i = 0; i < arr.length; i += 2) {
        const key = arr[i];
        const value = arr[i + 1];
        params[key] = value;
    }
    return params;
};

interface IConvertQtoO {
    (url: string): {[key: string]: string}
}