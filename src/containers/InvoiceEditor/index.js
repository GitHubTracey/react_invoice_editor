import React, { Component } from 'react'
import './styles.css'
// redux
import { connect } from 'react-redux'
import {
    updateInvoice,
    updateNewItem,
} from '../../redux/actions'

class InvoiceEditor extends Component {

    _isItemReadyToAddToInvoice(e) {
        /* _isItemReadyToAddToInvoice
         *  - when leaving the new item input fields, check to see if item is ready to be added to the invoice 
         *  - must fill in the name and the qty,  >not requiring price as the item may be "free"
         *  - then set the focus to the "newitem" field (first input field in new item row)
         */
        if (this.props.newItem && (this.props.newItemQty || this.props.newItemQtyFieldDirty) && (Number.parseFloat(this.props.newItemPrice) >= 0) && this.props.newItemPriceFieldDirty) {
            this.props.updateInvoice('add', { item: this.props.newItem, qty: this.props.newItemQty, price: this.props.newItemPrice, lineTotal: this.props.newItemLineTotal })
            this.props.updateInvoice('total')
            document.getElementById("newitem").focus();
        }
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
                    </thead>
                    <tbody>
                        {/* display each of the invoice items that are already on the list */}
                        {
                            this.props.invoiceItems.map((lineitem) => {
                                const { id, item, qty, price, lineTotal } = lineitem
                                return (
                                    <tr className="row" key={id}>
                                        <td><input type="text" name="item" id={id} value={item}
                                            onChange={(e) => this.props.updateInvoice('update', { lineitem: lineitem, item: e.target.value })}
                                            onBlur={(e) => this.props.updateInvoice('total')}
                                            placeholder="Item Required" /></td>
                                        <td><input type="text" name="qty" id={id} value={qty}
                                            onChange={(e) => this.props.updateInvoice('update', { lineitem: lineitem, qty: e.target.value })}
                                            onBlur={(e) => this.props.updateInvoice('total')} /></td>
                                        <td><input type="text" name="price" id={id} value={price}
                                            onChange={(e) => this.props.updateInvoice('update', { lineitem: lineitem, price: e.target.value })}
                                            onBlur={(e) => this.props.updateInvoice('total')} /></td>
                                        <td><input type="text" tabIndex="-1" name="lineTotal" id={id} value={lineTotal} readOnly={true} /></td>
                                        <td><input type="button" tabIndex="-1" id={id} onClick={() => this.props.updateInvoice('delete', lineitem)} value={"X"} /></td>
                                    </tr>
                                )
                            })
                        }
                        {/* new row at bottom of table 
                          * for onChange events, update with each keystroke
                          * for onBlur (exit focus) events, check to see if this item is ready to add to the invoice - requires name & qty as item may be free
                          */}
                        <tr className="newrow" key={"newitem"} >
                            <td><input type="text" name="item" id={"newitem"} value={this.props.newItem}
                                onChange={(e) => this.props.updateNewItem('update', { item: e.target.value })}
                                onBlur={this._isItemReadyToAddToInvoice.bind(this)}
                                placeholder="New Item" /></td>
                            <td><input type="text" name="qty" id={"newitemqty"} value={this.props.newItemQty}
                                onChange={(e) => this.props.updateNewItem('update', { qty: e.target.value })}
                                onBlur={this._isItemReadyToAddToInvoice.bind(this)} /></td>
                            <td><input type="text" name="price" id={"newitemprice"} value={this.props.newItemPrice}
                                onChange={(e) => this.props.updateNewItem('update', { price: e.target.value })}
                                onBlur={this._isItemReadyToAddToInvoice.bind(this)} /></td>
                            <td><input type="number" name="total" id={"newitemtotal"} value={this.props.newItemLineTotal} readOnly={true} /></td>
                            <td><input type="button" id={"newitemclear"} onClick={(e) => this.props.updateNewItem('clear')} value={"X"} /></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <table>
                        <tbody>
                            <tr><td>Subtotal</td><td>{this.props.subtotal}</td></tr>
                            <tr><td>Tax (5%)</td><td>{this.props.tax}</td></tr>
                            <tr><td>Total</td><td>{this.props.total}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    //invoice
    invoiceItems: state.invoice.invoiceItems,
    subtotal: state.invoice.subtotal,
    tax: state.invoice.tax,
    total: state.invoice.total,
    //newitem
    newItem: state.newitem.item,
    newItemQty: state.newitem.qty,
    newItemPrice: state.newitem.price,
    newItemLineTotal: state.newitem.lineTotal,
    newItemPriceFieldDirty: state.newitem.priceFieldDirty,
    newItemQtyFieldDirty: state.newitem.qtyFieldDirty,
})

const mapDispatchToPRops = {
    updateInvoice,
    updateNewItem,
}

export default connect(mapStateToProps, mapDispatchToPRops)(InvoiceEditor)

