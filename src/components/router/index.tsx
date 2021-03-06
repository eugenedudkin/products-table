import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import ProductsTable from "../products-table";
import ModalProvider from "../modal";
import { fetchData } from "../../store/dataReducer";
import { fetchDelivery } from "../../store/deliveryReducer";
import { FC } from "react";

const AppRouter: FC = () => {

    const dispatch = useDispatch();

    dispatch(fetchData());
    dispatch(fetchDelivery());

    return (<>
        <BrowserRouter>
            <ModalProvider>
                <Switch>
                    <Route 
                        exact path="/"
                        render={() => {
                            return (<ProductsTable />)
                        }} />  
                    <Route  
                        path="/search" 
                        render={() => {
                            return (<ProductsTable />)
                        }} />
                    <Route  
                        path="/id:id" 
                        render={() => {
                            return (<ProductsTable />)
                        }} />
                    <Route 
                        path="*" 
                        render={() => <div>Error 404</div>}/> 
                </Switch>
            </ModalProvider>
        </BrowserRouter>
    </>)
};

export default AppRouter;