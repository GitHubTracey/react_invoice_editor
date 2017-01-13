export const INVOICE_ITEM_ADD = 'INVOICE_ITEM_ADD'
export const INVOICE_ITEM_DELETE = 'INVOICE_ITEM_DELETE'
export const INVOICE_ITEM_UPDATE = 'INVOICE_ITEM_UPDATE'
export const NEW_ITEM_CLEAR = 'NEW_ITEM_CLEAR'
export const NEW_ITEM_UPDATE = 'NEW_ITEM_UPDATE'
export const INVOICE_UPDATE_TOTALS = 'INVOICE_UPDATE_TOTALS'

export const updateInvoice = (updateAction, item) => dispatch => {
    switch (updateAction) {
        case 'add':
            dispatch({ type: INVOICE_ITEM_ADD, payload: item })
            return dispatch({ type: NEW_ITEM_CLEAR })
        case 'delete':
            return dispatch({ type: INVOICE_ITEM_DELETE, payload: item })
        case 'update':
            return dispatch({ type: INVOICE_ITEM_UPDATE, payload: item })
        case 'total':
            return dispatch({ type: INVOICE_UPDATE_TOTALS })
        default:
            return null
    }
}

export const updateNewItem = (updateAction, formData) => dispatch => {
    switch (updateAction) {
        case 'update':
            return dispatch({ type: NEW_ITEM_UPDATE, payload: formData })
        case 'clear':
            return dispatch({ type: NEW_ITEM_CLEAR })
        default:
            return null
    }
}