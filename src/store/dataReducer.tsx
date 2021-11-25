import { Payload, ItemData } from './types';
import { Reducer } from 'redux';

export const FETCH_DATA: "FETCH_DATA" = "FETCH_DATA";
export const SET_DATA: "SET_DATA" = "SET_DATA";
export const SET_ITEM: "SET_ITEM" = "SET_ITEM";
export const FAILED_FETCH_DATA: "FAILED_FETCH_DATA" = "FAILED_FETCH_DATA";
export const DELETE_ITEM: "DELETE_ITEM" = "DELETE_ITEM";
export const DELETE_DATA: "DELETE_DATA" = "DELETE_DATA";
export const CHANGE_ITEM: "CHANGE_ITEM" = "CHANGE_ITEM";
export const CHANGE_DATA: "CHANGE_DATA" = "CHANGE_DATA";

const dataReducer: Reducer<ItemData[], Action> = (state = [], action)  => {
    
    switch(action.type) {
        case SET_DATA:
            if (Array.isArray(action.payload)){
                return [...state, ...action.payload]
            }
            return [...state, action.payload]
             
        case CHANGE_DATA:
            const changeID = action.payload.id;
            const changedItem: Payload = action.payload!
            return [
                ...state.map((item: ItemData) => item.id === changeID 
                    ? changedItem
                    : item)
            ]
        case DELETE_DATA:
            const deleteID = action.payload;
            return [...state.filter((item: any) => item.id !== deleteID)
            ];
        default:
            return state;
    }
};

export const fetchData: IActionCreator = () => ({type: FETCH_DATA})
export const failedFetchData = (error: unknown) => ({type: FAILED_FETCH_DATA, error})
export const setData: IActionCreator = (payload) => ({type: SET_DATA, payload})
export const setItem: IActionCreator = (payload) => ({type: SET_ITEM, payload})
export const deleteItem: IActionCreator = (payload) => ({type: DELETE_ITEM, payload})
export const deleteData: IActionCreator = (payload) => ({type: DELETE_DATA, payload})
export const changeItem: IActionCreator = (payload) => ({type: CHANGE_ITEM, payload})
export const changeData: IActionCreator = (payload) => ({type: CHANGE_DATA, payload})

export default dataReducer;

interface IActionCreator {
    (payload?: Payload): {type: string, payload?: Payload}
}

type ActionDeleteData = {
    type: "DELETE_DATA";
    payload: number
} 

type ActionObject = {
    type: "CHANGE_DATA";
    payload: ItemData
} 

type ActionArray = {
    type: "SET_DATA";
    payload: Array<ItemData>
}

type Action = ActionObject | ActionArray | ActionDeleteData