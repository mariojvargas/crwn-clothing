import StripeCheckout from 'react-stripe-checkout';

const CentsPerDollar = 100;
const PublishableKey =
  'pk_test_51JzWIpDota9QJLc6mH8Eco30qnVPgd7L4wj42Ur3cTKOt9l5lGIqGwZjpGYP5rHwFZTMirzsl1wMPGRN2Me5uapA00OjTCHSyn';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * CentsPerDollar;

  const onToken = (token) => {
    console.log('Stripe Token', token);

    alert('Payment Successful');
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://placekitten.com/120/120"
      description={`Your total price is $${price.toFixed(2)}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={PublishableKey}
    />
  );
};

export default StripeCheckoutButton;
