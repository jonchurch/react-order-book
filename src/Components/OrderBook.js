import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AskOrder from './AskOrder';
import BidOrder from './BidOrder';


class OrderBook extends Component {

  render() {

    function sumQuantities(orders) {
      return orders.reduce((total, order) => total + order.quantity, 0);
    }

    let totalAsks = sumQuantities(this.props.askOrders);
    let totalBids = sumQuantities(this.props.bidOrders);
    let maxCumulative = Math.max(totalAsks, totalBids);

    let deepCopyArrayOfObj = (arr => arr.map(order => Object.assign({}, order)));

    // Deep copy and sort orders
    let askOrders = deepCopyArrayOfObj(this.props.askOrders).sort((a, b) => a.price - b.price); // ascending order
    let bidOrders = deepCopyArrayOfObj(this.props.bidOrders).sort((a, b) => b.price - a.price); // descending order

    function renderOrders(ComponentClass, orders) {
      let cumulative = 0;
		if (orders.length === 0) {
			const dummy = {
				price: 0,
				quantity: 0,
			}
		
			orders = new Array(20).fill().map(() => dummy)
		}
      return orders.map((order, index) => {
        order.cumulative = (cumulative += order.quantity);
        order.maxCumulative = maxCumulative;
        return (<ComponentClass key={index} {...order} />);
      });
    }

	  function spreadPrice(bid, ask) {
		  if (ask && bid) {
			  return Number(ask.price - bid.price).toFixed(8)
		  } else {
			  return null
		  }
	  }

    return (
      <div className="OrderBook">
        <table>
          <thead>
            <tr>
              <th>Depth</th>
              <th>Price</th>
            </tr>
          </thead>
		</table>
		<div ref="scroller" id="scroll-tainer">
		<table ref="orders">
          <tbody>
            {renderOrders(AskOrder, askOrders).reverse()}
          </tbody>
		<tbody ref="spreadBody"> 
			<tr>
		<td className="spread align-right"> Spread:</td>
		<td className="spread align-left">{spreadPrice(bidOrders[0], askOrders[0])}</td>
			</tr>
		</tbody>
          <tbody>
            {renderOrders(BidOrder, bidOrders)}
          </tbody>
        </table>
      </div>
		</div>
    );
  }

componentDidMount() {
	 this.refs.scroller.scrollTop = (this.refs.scroller.scrollHeight - this.refs.scroller.clientHeight) / 2
	console.log(this.refs.scroller.scrollTop)
}
}

OrderBook.propTypes = {
  askOrders: PropTypes.array,
  bidOrders: PropTypes.array
};

export default OrderBook;
