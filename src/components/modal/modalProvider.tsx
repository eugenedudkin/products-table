import { createContext, FC, useContext, useState, useEffect } from 'react';
import Layout from './layout';
import ItemLayout from './ItemLayout';

const initialState: IModal = {
    openModal: () => {
        throw new Error('Not implemented');
    },
    closeModal: () => {
        throw new Error('Not implemented');
    },
};
export const ModalContext = createContext(initialState);
export const useModal = () => useContext(ModalContext);

const ModalProvider: FC<IModalProviderProp> = ({children}: IModalProviderProp) => {
    const [modals, setModals] = useState<ModalState>([]);
    const [active, setActive] = useState<boolean>(false);
    const [beforeClose, setBeforeClose] = useState<boolean>(false);

    useEffect(() => {
        if (modals.length === 0 && active) {
            setBeforeClose(true);
        };
    }, [modals.length, active]);

    useEffect(() => {
        if (beforeClose) {
            setTimeout(() => {
                setActive(false); 
            }, 300); 
        };
    }, [beforeClose]);

    useEffect(() => {
        if (!active) {
            closeModal();    
        };
    }, [active]);
    
    const openModal: IModal['openModal'] = (ModalComponent, props) => { 
        setActive(true);
        setBeforeClose(false);
        setModals((state) => [...state, {Component: ModalComponent, props}]);
    };

    const closeModal: IModal['closeModal'] = () => {
        setModals((state) => state.slice(0, -1));
    };

    return (    
        <ModalContext.Provider
            value={{
                openModal,
                closeModal
            }}>
            {children}
            {active && <Layout active={!beforeClose} />}
            {modals.map((Item: any, index: number) => (
                <ItemLayout key={index}>
                    <Item.Component {...Item.props} />
                </ItemLayout>
            ))}
        </ModalContext.Provider>
    )
};

export default ModalProvider;

type ModalState = { 
    Component: FC<any>, 
    props?: any 
}[] | [];

interface IModalProviderProp {
    children: JSX.Element[] | JSX.Element;
};

interface IModal {
    openModal(ModalComponent: FC<any>, props?: any): void;
    closeModal(): void;
};
