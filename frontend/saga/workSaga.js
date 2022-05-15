import {put, takeLatest, call} from "redux-saga/effects"
import { getListWork, setListWork } from "../state/slices/work";
import { getListWorkAPI } from "./workAPI";


function* getListWorkSaga(){
    try {
        const data = yield call(getListWorkAPI)
        yield put(setListWork(data))
    }catch (error) {
        console.log(error)
    }  
}



function* workWatcher() {
    yield takeLatest(getListWork.type, getListWorkSaga);
  }

export default workWatcher