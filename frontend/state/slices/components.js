import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    modal: false,
    detailModal: 2,
    isAlert: false,
    typeAlert: '',
    detailAlert: '',
}

const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {

    makeOrder(){},

    showModal(state, action) {
        state.modal = true
        state.detailModal = action.payload
    },
    hideModal(state) {
        state.modal = false
    },
    
    showAlert(state, action) {
        state.isAlert = true
        state.typeAlert = action.payload.typeAlert
        state.detailAlert = action.payload.detailAlert
    },
    hideAlert(state) {
        state.isAlert = false
    },
  },
})

export const { showModal, hideModal, showAlert, hideAlert, makeOrder } = componentsSlice.actions
export default componentsSlice.reducer