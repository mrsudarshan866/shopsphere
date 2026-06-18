import ShippingForm from "../../components/checkout/ShippingForm";
import PaymentForm from "../../components/checkout/PaymentForm";

const CheckoutPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-6">Shipping</h2>

          <ShippingForm />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-6">Payment</h2>

          <PaymentForm />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
