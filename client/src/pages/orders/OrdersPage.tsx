import { useParams } from "react-router-dom";
import { useGetOrdersQuery } from "../../features/orders/orderApi";

const MyOrdersPage = () => {
  const { id } = useParams();
  const { data } = useGetOrdersQuery(id);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-4">
        {data?.data?.map((order: any) => (
          <div key={order._id} className="bg-white p-5 rounded-xl shadow">
            <p>Order ID: {order._id}</p>

            <p>Total: ₹{order.totalPrice}</p>

            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
