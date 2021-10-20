import { all } from "redux-saga/effects";
import { dataWatcher } from './dataSaga';
import { deliveryWatcher } from './deliverySaga';

export default function* rootWatcher() {
    yield all([dataWatcher(), deliveryWatcher()])
}