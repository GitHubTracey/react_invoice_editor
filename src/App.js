import React, { Component } from 'react'
import './App.css'

//connect app to store
import { Provider } from 'react-redux'
import store from './redux/store'
//app
import InvoiceEditor from './containers/InvoiceEditor'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <InvoiceEditor />
            </Provider>
        )
    }
}

export default App
