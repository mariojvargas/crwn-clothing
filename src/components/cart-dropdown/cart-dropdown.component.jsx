import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';

const Cart = () => (
  <div className="cart-dropdown">
    <div className="cart-items"></div>
    <CustomButton>Go to Checkout</CustomButton>
  </div>
);

export default Cart;
