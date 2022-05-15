import {put, takeLatest, call} from "redux-saga/effects"
import { getDetailServiceAPI, getMainServicesAPI } from "./servicesAPI";
import { getDetailService, getMainServices, setDetailService, setMainServices } from '../state/slices/services'


function* getMainServicesSaga(){
    try {
        const data = yield call(getMainServicesAPI)
        yield put(setMainServices(data))
    }catch (error) {
        console.log(error)
    }  
}
function* getDetailServicesSaga(action){
    try {
        const data = yield call(getDetailServiceAPI, action.slug)
        yield put(setDetailService(data))
    }catch (error) {
        console.log(error)
    }  
}



function* servicesWatcher() {
    yield takeLatest(getMainServices.type, getMainServicesSaga);
    yield takeLatest(getDetailService.type, getDetailServicesSaga);
  }

export default servicesWatcher