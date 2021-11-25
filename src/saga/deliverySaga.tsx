import { call, put, takeEvery } from "redux-saga/effects";
import { getApi } from "../api";
// import jsonDelivery from '../mock/delivery.json';
import { FETCH_DELIVERY, setDelivery, failedFetchDelivery } from '../store/deliveryReducer';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function* fetchMockDeliveryWorker(): any {
    try {
        yield delay(1000);
        // const {delivery} = jsonDelivery;
        const delivery = yield call(getApi, "delivery");
        yield put(setDelivery(delivery));
    } catch(error) {
        yield put(failedFetchDelivery(error))
    }
    return 0;
}

export function* deliveryWatcher() {
    yield takeEvery(FETCH_DELIVERY, fetchMockDeliveryWorker)
}