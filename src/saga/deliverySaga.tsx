import { call, put, takeEvery } from "redux-saga/effects";
// import jsonDelivery from '../mock/delivery.json';
import { FETCH_DELIVERY, setDelivery, failedFetchDelivery } from '../store/deliveryReducer';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

const getDelivery = () => fetch(`http://localhost:3001/delivery`)
    .then((response) => {
        return response.json();
    });

function* fetchMockDeliveryWorker(): any {
    try {
        yield delay(1000);
        // const {delivery} = jsonDelivery;
        const delivery = yield call(getDelivery);
        yield put(setDelivery(delivery));
    } catch(error) {
        yield put(failedFetchDelivery(error))
    }
    return 0;
}

export function* deliveryWatcher() {
    yield takeEvery(FETCH_DELIVERY, fetchMockDeliveryWorker)
}