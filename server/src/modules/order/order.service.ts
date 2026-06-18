import Order from "./order.model";
import Cart from "../cart/cart.model";
import Product from "../product/product.model";

const generateOrderNumber = () => {
  return "ORD-" + Date.now();
};

export const createOrderService = async (userId: string, payload: any) => {
  const cart = await Cart.findOne({
    user: userId,
  }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const orderItems: any[] = [];

  for (const item of cart.items) {
    const product: any = item.product;

    if (product.stock < item.quantity) {
      throw new Error(`${product.name} out of stock`);
    }

    product.stock -= item.quantity;

    await product.save();

    orderItems.push({
      product: product._id,
      name: product.name,
      image: product.images?.[0],
      quantity: item.quantity,
      price: item.price,
    });
  }

  const order = await Order.create({
    user: userId,

    orderNumber: generateOrderNumber(),

    items: orderItems,

    shippingAddress: payload.shippingAddress,

    paymentMethod: payload.paymentMethod,

    totalAmount: cart.totalAmount,
  });

  (cart.items as any) = [];
  cart.totalItems = 0;
  cart.totalAmount = 0;

  await cart.save();

  return order;
};

export const getMyOrdersService = async (userId: string) => {
  return Order.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });
};

export const getOrderService = async (orderId: string) => {
  return Order.findById(orderId)
    .populate("user", "name email")
    .populate("items.product");
};

export const getAllOrdersService = async () => {
  return Order.find().populate("user", "name email").sort({
    createdAt: -1,
  });
};

export const updateOrderStatusService = async (
  orderId: string,
  status: string,
) => {
  return Order.findByIdAndUpdate(
    orderId,
    {
      orderStatus: status,
    },
    {
      new: true,
    },
  );
};

export const orderAnalyticsService = async () => {
  const sales = await Order.aggregate([
    {
      $group: {
        _id: null,

        totalOrders: {
          $sum: 1,
        },

        revenue: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  return sales[0];
};
