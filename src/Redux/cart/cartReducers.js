import {
  productsAdditionInCart,
  productRemovalFromCart,
} from "../../utility/products";
import {
  ADD_PRODUCT_TO_CART,
  DELETE_PRODUCT_FROM_CART,
  REMOVE_PRODUCT_FROM_CART,
} from "./cartConstants";

var initialState = [];

var cartReducers = (state = initialState, actions) => {
  var { type, payload } = actions;
  switch (type) {
    case ADD_PRODUCT_TO_CART:
      return productsAdditionInCart(state, payload.product);
    case REMOVE_PRODUCT_FROM_CART:
      return productRemovalFromCart(state, payload.productId);
    case DELETE_PRODUCT_FROM_CART:
      return state.filter((product) => product.id !== payload.productId);
    default:
      return state;
  }
};
export default cartReducers;
