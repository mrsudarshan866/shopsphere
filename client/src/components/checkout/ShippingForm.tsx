import { useForm } from "react-hook-form";

const ShippingForm = () => {
  const { register } = useForm();

  return (
    <div className="space-y-4">
      <input
        {...register("fullName")}
        placeholder="Full Name"
        className="w-full border rounded p-3"
      />

      <input
        {...register("address")}
        placeholder="Address"
        className="w-full border rounded p-3"
      />

      <input
        {...register("city")}
        placeholder="City"
        className="w-full border rounded p-3"
      />

      <input
        {...register("postalCode")}
        placeholder="Postal Code"
        className="w-full border rounded p-3"
      />
    </div>
  );
};

export default ShippingForm;
