import {
    INVOICE_ITEM_ADD,
    INVOICE_ITEM_DELETE,
    INVOICE_ITEM_UPDATE,
    INVOICE_UPDATE_TOTALS,
} from '../actions'

const initialState = {
    invoiceItems: [],
    /* invoiceItems: [
            {
                id: 1,
                item: 'Apple',
                qty: 2,
                price: 0.35,
                lineTotal: 0.7,
            },
            {
                id: 2,
                item: 'Kiwi',
                qty: 4,
                price: 1,
                lineTotal: 4,
            },
            {
                id: 3,
                item: 'Banana',
                qty: 2,
                price: 0.45,
                lineTotal: 0.9,
            },
            {
                id: 4,
                item: 'Kiwi',
                qty: 1,
                price: 0.5,
                lineTotal: 0.5,
            },
        ],
        */
    taxRate: 0.05,
    subtotal: 0,
    tax: 0,
    total: 0,
    invoiceLineNumber: 5,
}

export default (state = initialState, action) => {
    var index = -1
    let lineitem = undefined,
        item = '',
        qty = 0,
        price = 0,
        lineTotal = 0

    switch (action.type) {
        case INVOICE_ITEM_ADD:
            /* INVOICE_ITEM_ADD
             * 
             * create a newInvoiceWithItemAdded 
             * if item and price provided for new item, then add to end of list
             *  > "returns" handled via negative value for qty
             * calculate updated subtotal, tax and total
             * 
             * else return the state, but do not add
             */
            item = action.payload.item
            qty = action.payload.qty
            price = action.payload.price
            lineTotal = action.payload.lineTotal

            if (item && Number.parseInt(qty, 10) && (Number.parseFloat(price) >= 0)) {
                const newInvoiceWithItemAdded = state.invoiceItems.concat(
                    { id: state.invoiceLineNumber, item: item, qty: Number.parseInt(qty, 10), price: Number.parseFloat(price), lineTotal: lineTotal })

                return { ...state, invoiceItems: newInvoiceWithItemAdded, invoiceLineNumber: state.invoiceLineNumber + 1 }
            }
            else
                return state
        case INVOICE_ITEM_DELETE:
            /* INVOICE_ITEM_DELETE
             * get the index
             * make a copy of the old array (need to copy so that the change is rerendered in the view)
             * if you find something(index >-1)
             *    > then remove (1) item from the list
             * return list
             */
            index = state.invoiceItems.indexOf(action.payload)
            var newInvoiceWithItemDeleted = state.invoiceItems.slice()
            if (index > -1)
                newInvoiceWithItemDeleted.splice(index, 1)

            return { ...state, invoiceItems: newInvoiceWithItemDeleted }

        case INVOICE_ITEM_UPDATE:
            /* INVOICE_ITEM_UPDATE
             * get the item to be updated
             * get the property to be updated (item, qty or price)
             * find the index of the item
             * copy the list
             * update the value of the required property
             * return newInvoiceWithItemUpdated
             */
            lineitem = action.payload.lineitem
            item = action.payload.item
            qty = action.payload.qty
            price = action.payload.price
            index = state.invoiceItems.indexOf(lineitem)
            var newInvoiceWithItemUpdated = state.invoiceItems.slice()
            
            if (action.payload.item !== undefined) newInvoiceWithItemUpdated[index].item = item
            if (qty) newInvoiceWithItemUpdated[index].qty = qty
            if (price) newInvoiceWithItemUpdated[index].price = price

            var q = newInvoiceWithItemUpdated[index].qty,
                p = newInvoiceWithItemUpdated[index].price
            newInvoiceWithItemUpdated[index].lineTotal = (q && p) ? Math.round(q * p * 100) / 100 : undefined

            return { ...state, invoiceItems: newInvoiceWithItemUpdated }

        case INVOICE_UPDATE_TOTALS:
            /* INVOICE_UPDATE_TOTALS
             * update the subtotal, tax and total for the invoice
             */
            var updatedTax = 0,
                updatedSubtotal = 0,
                updatedTotal = 0

            updatedSubtotal = 0
            state.invoiceItems.forEach((line) => {
                if (line.item && Number.parseInt(line.qty, 10) && Number.parseFloat(line.price))
                    updatedSubtotal += Number.parseInt(line.qty, 10) * Number.parseFloat(line.price)
            })
            updatedTax = state.taxRate * updatedSubtotal
            updatedTotal = updatedSubtotal + updatedTax

            return { ...state, subtotal: updatedSubtotal, tax: updatedTax, total: updatedTotal }
        default:
            return state
    }
}

/*

    componentDidMount() {
        let subtotal = 0
        this.props.invoiceItems.forEach(function (invoiceLine) {
            if (invoiceLine.qty && invoiceLine.price)
                subtotal += invoiceLine.qty * invoiceLine.price
        })

        subtotal = subtotal > 0 ? Math.round(subtotal * 100) / 100 : 0
        let total = subtotal > 0 ? Math.round((subtotal + subtotal * this.state.tax) * 100) / 100 : 0
        this.setState({ subtotal: subtotal, total: total })
    }
*/