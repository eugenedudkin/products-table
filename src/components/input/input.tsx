import './input.css';

const Input: IInput = (props) => {
    const {label, error = false, errorMsg, givenRef, ...inputProps} = props;

    return (
        <div className="inputDiv">
            <label className="inputlabel">
                {label}   
                <input
                    ref={givenRef} 
                    {...inputProps}
                    className={error ? "input error" : "input"} />
            </label>
            {error && <span className='errSpan'>{errorMsg}</span>}    
        </div>
    )
};

export default Input;

const onFocusCurrency = (e: any) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
};

const onBlurCurrency = (e: any) => {
    e.target.value = new Intl.NumberFormat(
        'en-US', 
        { style: "currency", currency: "USD" }
    ).format(e.target.value)
};

const onPasteInt = (e: any) => {
    const reg = /[^0-9]/;
    if (reg.test(e.clipboardData.getData('text/plain'))) e.preventDefault();
};
const onKeyPressInt = (e: any) => {
    const reg = /[0-9]/;
    if (!reg.test(e.key)) e.preventDefault();
};

const onKeyPressCurrency = (e: any) => {
    const reg = /[0-9.]/;
    if ((e.target.value.includes(".") && e.key === '.') || !reg.test(e.key)) e.preventDefault();
}

export const IntNumberInput = (props: any) => {
    return <Input 
                {...props}
                type="number"
                onKeyPress={onKeyPressInt}
                onPaste={onPasteInt}/>
}

export const CurrencyInput = (props: any) => {
    return <Input 
                {...props}
                type="text"
                onFocus={onFocusCurrency}
                onBlur={onBlurCurrency}
                onKeyPress={onKeyPressCurrency}/>
}

export const EmailInput = (props: any) => {
    return <Input 
                {...props}
                type="email"
                />
}
export const TextInput = (props: any) => {
    return <Input 
                {...props}
                type="text"
                />
}

export const emailValidate = (event: any) => {
        
    const reg = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
    const str = event.target.value;
    if (!reg.test(str)) {
        return {err: true,
        errMsg: "E-mail должен быть указан в формате test@example.com!"}
    }
    return {
        err: false,
        errMsg: ""
    }
}

type InputProps = {
    label?: string;
    error?: boolean;
    errorMsg?: string;
    [propName: string]: any; 
}

interface IInput {
    (props: InputProps) : JSX.Element;
}