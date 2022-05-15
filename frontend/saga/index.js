import {all} from "redux-saga/effects"
import componentWatcher from "./componentSaga"
import servicesWatcher from './servicesSaga'
import workWatcher from './workSaga'

export function* rootWatcher() {
    yield all([servicesWatcher(),componentWatcher(),workWatcher()])
}