import { call, put, takeEvery } from "redux-saga/effects";
import { getApi, postApi, deleteApi, putApi } from "../api";
// import jsonData from '../mock/data.json';
import { FETCH_DATA, setData, failedFetchData, SET_DATA, SET_ITEM, DELETE_DATA, DELETE_ITEM, deleteData, CHANGE_ITEM, changeData } from '../store/dataReducer';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

function* fetchMockDataWorker(): any {
    try {
        yield delay(1000);
        // const {data} = jsonData;
        const data = yield call(getApi, "data");
        yield put(setData(data));
    } catch(error) {
        yield put(failedFetchData(error))
    }
    return 0;
}
function* postDataWorker({payload}: any): any {
    try {
        yield call(postApi, "data", payload);
        yield put(setData(payload));
    } catch(error) {
        yield put(failedFetchData(error))
    }
    return 0;
}
function* putDataWorker({payload}: any): any {
    try {
        yield call(putApi, "data", payload, payload.id);
        yield put(changeData(payload));
    } catch(error) {
        yield put(failedFetchData(error))
    }
    return 0;
}

function* deleteDataWorker({payload}: any): any {
    try {
        yield call(deleteApi, "data", payload);
        yield put(deleteData(payload));
    } catch(error) {
        yield put(failedFetchData(error))
    }
    return 0;
}





export function* dataWatcher() {
    yield takeEvery(FETCH_DATA, fetchMockDataWorker);
    yield takeEvery(SET_ITEM, postDataWorker);
    yield takeEvery(DELETE_ITEM, deleteDataWorker);
    yield takeEvery(CHANGE_ITEM, putDataWorker);
}


