import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, RefObject, useRef, useState } from 'react';
import { changeItem, setData, setItem } from '../../store/dataReducer';
import validate from './validate';
import { CurrencyInput, IntNumberInput } from '../input/input';
import { ItemData } from '../../store/types';
import Button from '../button';
import Delivery from '../delivery';
import Input from '../input';
import './item-details.css';
import { useHistory } from 'react-router-dom';

const ItemDetails: IItemDetails = ({id, close}) => {
    let history = useHistory();
    const foundItemArr: ItemData[] = useSelector((state: any) => 
            state.items.filter((item: any) => item.id === id))
    const dispatch = useDispatch();
    const useData: IUseData = (id) => { 
        if (foundItemArr.length === 0) {
            return {
                id: id,
                name: "",
                quantity: 0,
                email: "",
                price: 0,
                delivery: []
            };
        }
        return foundItemArr[0];
    }

    const inputRef: InputRef = {
        name: useRef(null),
        email: useRef(null),
        delivery: useRef(null)
    }

    const defaultValidData: IValidData = {
        name: {err: false, errMsg: ""},
        email: {err: false, errMsg: ""},
        delivery: {err: false, errMsg: ""}
    }
    const [state, setState] = useState(useData(id));
    const [validData, setValidData] = useState(defaultValidData);
    const [notification, setNotification] = useState<boolean>(false);

    const {
        name,  
        email, 
        quantity, 
        price,
        delivery = []
    } = state;

    const closeHandler = () => {
        close();
        history.push("/");
    };

    const checkEmptyFields = () => {
        for (const [, value] of Object.entries(state)) {
            if(!value) {
                return true
            }
        }
        return false;
    }

    const setDelivery = (props: string[]) => {
        setState((state: ItemData) => {
            return {...state, delivery: props}
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if(value !== "") {
            setState((state: any) => {
                return {...state, [name]: validate(name, value)};                        
            });
        }
        setState((state: any) => {return {...state,[name]: value}});
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValidData((state: any) => {
            return {...state, [name]: validate(name, value)}                        
        });
    }

    const handleChangeCurrency = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const reg1 = /^[0-9]+(\.[0-9]{1,2})?$/; 
        if (!reg1.test(e.target.value)) {        
            e.preventDefault();
        } else {
            setState((state: any) => {
                return {...state, [name]: +parseFloat(value).toFixed(2)}
            });
        }
    };

    const emailInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValidData((state: any) => {
            return {...state, [name]: value}
                                        
        });
        setState((state: any) => {
            return {...state, email: value}
        });
    };

    const intNumberHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((state: any) => {
            return {...state, [name]: parseInt(value)}               
        });    
    };

    const handleSubmit = () => {
        
    };

    const deliveryValidate = (valid: string) => {
        setValidData((state: any) => {
            return !!valid 
                ? {...state, delivery: {err: true, errMsg: valid}}
                : {...state, delivery: {err: false, errMsg: ""}}                    
        });
    }

    const onSubmit = () => {
        for (let key in validData) {
            if(validData[key].err) {
                inputRef[key].current.focus()
                return 0;
            }
        }
        if (checkEmptyFields()) {
            setNotification(true);
            return 0;
        } else {
            setNotification(false)
        }

        foundItemArr.length === 0 
            ? dispatch(setItem(state))
            : dispatch(changeItem(state))
        close();
        history.push("/");
    };

    return (
        <div className="details">
            <div className="closeButton"
                onClick={closeHandler}>
                &times;                
            </div>
            <form onSubmit={handleSubmit}>
                <Input
                    givenRef={inputRef["name"]}
                    label='Name:' 
                    type="text"
                    value={name}
                    name='name'
                    id='name'
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={validData.name.err}
                    errorMsg={validData.name.errMsg} 
                    placeholder="Введите название товара" />

                <Input
                    givenRef={inputRef["email"]}
                    label='Supplier email:' 
                    type="email"
                    value={email}
                    name='email'
                    id='email'
                    onChange={emailInputChangeHandler}
                    onBlur={handleBlur}
                    error={validData.email.err}
                    errorMsg={validData.email.errMsg}  
                    placeholder="Введите email" />

                <IntNumberInput
                    label='Count:' 
                    value={quantity}                 
                    name='quantity'
                    id='count' 
                    onChange={handleInputChange}
                    onBlur={intNumberHandler}
                    placeholder="Введите количество"/>

                <CurrencyInput
                    label='Price:' 
                    type="text"
                    defaultValue={new Intl.NumberFormat('en-US', { 
                        style: "currency", 
                        currency: "USD" }).format(price)}
                    name='price'
                    id='price'               
                    onChange={handleChangeCurrency}
                    placeholder="Введите цену товара"/> 

                <Delivery
                    givenRef={inputRef["delivery"]}
                    error={validData.delivery}
                    deliveryValidate={deliveryValidate} 
                    delivery={delivery}
                    setDelivery={setDelivery} />
            </form>
            <div className="notification">
                {notification && <p>Все поля должны быть заполнены!</p>}
            </div>
            
            <Button 
                onClick={onSubmit}
                className="default" 
                text="Add / Update"/>
        </div>
    )
};

export default ItemDetails;

type IDProps = {
    id: number,
    close: any
}

interface IItemDetails {
    ({id, close}: IDProps): JSX.Element
}

interface IUseData {
    (id: number): ItemData
}

interface IValidData {
    [index: string]: {
        err: boolean;
        errMsg: string
    };
}

type InputRef = {
    [key: string]: RefObject<any>
}