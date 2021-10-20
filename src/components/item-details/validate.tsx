const validate = (funcName: string, funcProps: string) => {
    switch (funcName) {
        case "name":
            return nameValidate(funcProps)                        
        case "email":    
            return emailValidate(funcProps)                       
        default:
            break;
    }
}

const nameValidate = (str: string) => {
    const reg = /^[a-Я\d]/;
    if (str.length > 15) {
        return {err: true,
        errMsg: "Поле должно содержать не более 15 символов!"}
    };
    if (str.length === 0) {
        return {err: true,
        errMsg: "Поле не должно быть пустым!"};
        
    };
    if (!reg.test(str)) {
        return {err: true,
        errMsg: "Поле должно начинаться с буквы или цифры!"}
    };
    return {err: false,
        errMsg: ""};
};

const emailValidate = (str: string) => {
        
    const reg = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
    if (!reg.test(str)) {
        return {err: true,
        errMsg: "E-mail должен быть указан в формате test@example.com!"}
    };
    return {err: false,
        errMsg: ""};
};

export default validate;
