export type ItemData = {
    id: number;
    name: string;
    quantity: number;
    email: string;
    price: number;
    delivery?: string[]
}

export type DeliveryItem = {
    country: string;
    id: string;
    cities: string[]
}

export type DeliveryPayload = DeliveryItem[]
  
export type DataState = ItemData[]

export type Payload = ItemData[] | ItemData | number

export interface IAction {
    type: string
    payload?: Payload 
}

export interface IDeliveryAction {
    type: string
    payload: DeliveryPayload
}

export interface IData {
    id: number,
    name: string,
    quantity: number,
    email: string,
    price: number,
    delivery: [
        option: string,
        country?: string,
        cities?: string[]
    ]
}

export interface IDelivery {
    country: string,
    cities?: string[]
}

export interface IStore {
    items?: ItemData[],
    delivery?: DeliveryItem[]
}
