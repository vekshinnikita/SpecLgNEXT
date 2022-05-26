import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE} from 'next-redux-wrapper';


const initialState = {
    listWork: [],
    listTags: [],
}

const workSlice = createSlice({
  name: 'work',
  initialState,
  reducers: {

    getListWork(){},
    setListWork(state, action) {
        state.listWork = action.payload
    },
    getWorkTags(){},
    setWorkTags(state, action) {
        state.listTags = action.payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.work
      }
    } 
  }
})

export const { setListWork, getListWork, setWorkTags, getWorkTags } = workSlice.actions
export default workSlice.reducer