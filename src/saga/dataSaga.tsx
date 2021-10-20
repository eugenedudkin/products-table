import { put, takeEvery } from "redux-saga/effects";
import jsonData from '../mock/data.json';
import { FETCH_DATA, setData, failedFetchData } from '../store/dataReducer';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

function* fetchMockDataWorker() {
    try {
        yield delay(1000);
        const {data} = jsonData;
        yield put(setData(data));
    } catch(error) {
        yield put(failedFetchData(error))
    }
    return 0;
}

export function* dataWatcher() {
    yield takeEvery(FETCH_DATA, fetchMockDataWorker)
}