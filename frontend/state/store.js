import { configureStore } from '@reduxjs/toolkit'
// import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk';
// import { rootWatcher } from '../saga';
import {createWrapper} from 'next-redux-wrapper';

import componentsReducer from './slices/components'
import servicesReducer from './slices/services'
import workReducer from './slices/work'

// const saga = createSagaMiddleware()

export const store = () => configureStore({
  reducer: {
    components: componentsReducer,
    services: servicesReducer,
    work: workReducer,
  },
  middleware: [ thunk ]
})




export const wrapper = createWrapper(store)
