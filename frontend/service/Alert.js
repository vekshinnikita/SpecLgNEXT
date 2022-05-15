import { hideAlert, showAlert } from "../state/slices/components";


const delay = time => new Promise(resolve => setTimeout(resolve, time))

export function* callAlertSaga(type, description,  put){
  yield put(showAlert({typeAlert: type, detailAlert: description}))
  yield delay(5000);
  yield put(hideAlert())
}

export function callAlert(type, description, dispatch){
    dispatch(showAlert({typeAlert: type, detailAlert: description}))
    setTimeout(() => {
        dispatch(hideAlert())
    }, 5000)
  }