import { call, put, takeEvery } from "redux-saga/effects";
// import jsonData from '../mock/data.json';
import { FETCH_DATA, setData, failedFetchData } from '../store/dataReducer';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

const getData = () => fetch(`http://localhost:3001/data`)
    .then((response) => {
        return response.json();
    });

function* fetchMockDataWorker(): any {
    try {
        yield delay(1000);
        // const {data} = jsonData;
        const data = yield call(getData);
        yield put(setData(data));
    } catch(error) {
        yield put(failedFetchData(error))
    }
    return 0;
}

export function* dataWatcher() {
    yield takeEvery(FETCH_DATA, fetchMockDataWorker)
}