//above and beyond initial requirements, but I like the structure of this setup for future additions
import { combineReducers } from 'redux'

import InvoiceReducer from './invoice'
import NewItemReducer from './newitem'

const rootReducer = combineReducers({
    invoice: InvoiceReducer,
    newitem: NewItemReducer,
})

export default rootReducer