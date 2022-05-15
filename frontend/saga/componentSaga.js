import {put, takeLatest, call} from "redux-saga/effects"
import { callAlertSaga } from "../service/Alert";
import { makeOrder } from "../state/slices/components";
import { makeOrderAPI } from "./componentAPI";



function* makeOrderSaga(action){
    try {
        yield call(makeOrderAPI, action.payload)
        yield callAlertSaga("success",'Заявка отправлена успешно', put)

    }catch (error) {
        yield callAlertSaga("error",'Упс... Что-то пошло не так', put)
        console.log(error)
    }  
}




function* componentWatcher() {
    yield takeLatest(makeOrder.type, makeOrderSaga);
  }

export default componentWatcher