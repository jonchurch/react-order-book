import React from 'react';
import AbstractOrder from './AbstractOrder';

class AskOrder extends AbstractOrder {

  render() {
    return (
      <tr className="ask fill-ask" style={{backgroundSize: this.getPercentage() + "% 100%"}}>
        <td>{this.props.quantity}</td>
        <td>{this.props.price}</td>
      </tr>
    );
  }
}

export default AskOrder;
