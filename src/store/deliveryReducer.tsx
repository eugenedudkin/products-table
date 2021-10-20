import { DeliveryPayload, DeliveryItem } from "./types";
import { Reducer } from 'redux';

export const FETCH_DELIVERY: "FETCH_DELIVERY" = "FETCH_DELIVERY";
export const FAILED_FETCH_DELIVERY: "FAILED_FETCH_DELIVERY" = "FAILED_FETCH_DELIVERY";
export const SET_DELIVERY: "SET_DELIVERY" = "SET_DELIVERY";

const deliveryReducer: Reducer<DeliveryItem[], ActionDelivery> = (state = [], action) => {
    switch(action.type) {
        case SET_DELIVERY:
            return [...state, ...action.payload];
        default:
            return state;
    };
};

export const fetchDelivery: IActionDeliveryCreator = () => ({type: FETCH_DELIVERY});
export const failedFetchDelivery = (error: unknown) => ({type: FAILED_FETCH_DELIVERY, error});
export const setDelivery: IActionDeliveryCreator = (payload) => ({type: SET_DELIVERY, payload});

export default deliveryReducer;

interface IActionDeliveryCreator {
    (payload?: DeliveryPayload): {type: string, payload?: DeliveryPayload};
};

type ActionDelivery = {
    type: "SET_DELIVERY";
    payload: DeliveryPayload;
};

