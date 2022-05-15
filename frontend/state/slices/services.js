import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE} from 'next-redux-wrapper';

const initialState = {
    mainServices: [],
    detailService: {
        description: '',
    },
}

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {

    getMainServices(){},
    setMainServices(state, action) {
        state.mainServices = action.payload
    },
    getDetailService(){},
    setDetailService(state, action) {
        state.detailService = action.payload
    },

  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.services
      }
    } 
  }
})

export const { setDetailService, setMainServices, getMainServices, getDetailService } = servicesSlice.actions
export default servicesSlice.reducer