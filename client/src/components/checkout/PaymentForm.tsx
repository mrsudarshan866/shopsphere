const PaymentForm = () => {
  return (
    <div className="space-y-4">
      <label className="flex gap-3">
        <input type="radio" name="payment" defaultChecked />
        Razorpay
      </label>

      <label className="flex gap-3">
        <input type="radio" name="payment" />
        Stripe
      </label>

      <label className="flex gap-3">
        <input type="radio" name="payment" />
        Cash On Delivery
      </label>
    </div>
  );
};

export default PaymentForm;
