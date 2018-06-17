import React, { Component } from 'react';
import Websocket from 'react-websocket';
import OrderBook from './Components/OrderBook';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      instrument: "TRXBTC",
	  base_url: 'wss://stream.binance.com:9443',
      askOrders: [],
      bidOrders: []
    };
  }

  handleData(rawData) {
    let data = JSON.parse(rawData);
	  // console.log({data})
    if (!data.data) {
      return;
    }

    let orderData = data.data

    let askOrders = orderData.asks.map(ask => ({
      price: parseFloat(ask[0]),
      quantity: parseFloat(ask[1])
    }));

    let bidOrders = orderData.bids.map(bid => ({
      price: parseFloat(bid[0]),
      quantity: parseFloat(bid[1])
    }));

    this.setState({
      askOrders: askOrders,
      bidOrders: bidOrders
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className="instrument">{this.state.instrument}</h1>
        <Websocket
          url={`${this.state.base_url}/stream?streams=${this.state.instrument.toLowerCase()}@depth20`}
          onMessage={this.handleData.bind(this)}
          />
        <OrderBook askOrders={this.state.askOrders} bidOrders={this.state.bidOrders} />
      </div>
    );
  }
}

export default App;
