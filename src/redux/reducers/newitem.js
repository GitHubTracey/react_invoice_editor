import {
    NEW_ITEM_CLEAR,
    NEW_ITEM_UPDATE,
} from '../actions'

const initialState = {
    id: "newitem",
    item: '',
    qty: 0,
    price: 0,
    lineTotal: 0,
    qtyFieldDirty: false,
    priceFieldDirty: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case NEW_ITEM_UPDATE:
            /* NEW_ITEM_UPDATE
             * grab field to update from payload (only updates one field at a time)
             * update the value of the field that was changed
             * 
             * lnQty = qty || state.qty  =>  value is either passed in or from state
             * if we have all requried criteria - item, qty & price, then 
             * return current state
             */
            const {item, qty, price} = action.payload,
                  lnQty = qty || state.qty,
                  lnPrice = price || state.price

            var lnTotal = 0
            if (Number.parseInt(lnQty, 10) && (Number.parseFloat(lnPrice) >= 0)) lnTotal = Number.parseInt(lnQty, 10) * Number.parseFloat(lnPrice)
            if (action.payload.item) return { ...state, item, lineTotal: lnTotal }
            if (qty) return { ...state, qty, lineTotal: lnTotal, qtyFieldDirty: true }
            if (price) return { ...state, price, lineTotal: lnTotal, priceFieldDirty: true }

            return state //default

        case NEW_ITEM_CLEAR:
            return initialState

        default:
            return state
    }
}