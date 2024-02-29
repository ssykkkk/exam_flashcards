import { configureStore } from '@reduxjs/toolkit'
import  cardsReducer  from './reducers/card.reducer'
import groupsReducer from './reducers/groups.reducer'
import errorsReducer from './reducers/errors.reducer'


export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    groups: groupsReducer,
    error: errorsReducer
  },
})