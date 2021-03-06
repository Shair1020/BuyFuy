import React, { useState } from "react";
import CheckoutList from "../../Components/CheckoutList/CheckoutList";
import { connect } from "react-redux";
import { calculateTotal } from "./../../utility/Checkout";
import OrderForm from "../../Components/OrderForm/OrderForm";

const CheckOut = ({ total }) => {
  const [shipFormShown, setShipFormShown] = useState(false);
  return (
    <div>
      <h1>Checkout</h1>
      <CheckoutList />
      <h2>Total Amount:{total} </h2>
      {shipFormShown && <OrderForm />}
      <button onClick={()=>setShipFormShown(!shipFormShown)}>PROCEED & PAY</button>
    </div>
  );
};
var mapState = (state) => ({
  total: calculateTotal(state.cart),
});

export default connect(mapState)(CheckOut);
