import Cart from "./cart.model";
import Product from "../product/product.model";

const calculateCart = (items: any[]) => {
  let totalItems = 0;
  let totalAmount = 0;

  items.forEach((item) => {
    totalItems += item.quantity;

    totalAmount += item.quantity * item.price;
  });

  return {
    totalItems,
    totalAmount,
  };
};

export const getCartService = async (userId: string) => {
  return Cart.findOne({
    user: userId,
  }).populate("items.product", "name price images stock");
};

export const addToCartService = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.stock < quantity) {
    throw new Error("Insufficient stock");
  }

  let cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item: any) => item.product.toString() === productId,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: product._id,
      quantity,
      price: product.price,
    });
  }

  const totals = calculateCart(cart.items);

  cart.totalItems = totals.totalItems;

  cart.totalAmount = totals.totalAmount;

  await cart.save();

  return cart;
};

export const updateCartItemService = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  const cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find(
    (item: any) => item.product.toString() === productId,
  );

  if (!item) {
    throw new Error("Cart item not found");
  }

  item.quantity = quantity;

  const totals = calculateCart(cart.items);

  cart.totalItems = totals.totalItems;

  cart.totalAmount = totals.totalAmount;

  await cart.save();

  return cart;
};

export const removeCartItemService = async (
  userId: string,
  productId: string,
) => {
  const cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item: any) => item.product.toString() !== productId,
  ) as any;

  const totals = calculateCart(cart.items);

  cart.totalItems = totals.totalItems;

  cart.totalAmount = totals.totalAmount;

  await cart.save();

  return cart;
};

export const clearCartService = async (userId: string) => {
  const cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    return null;
  }

  (cart.items as any) = [];
  cart.totalItems = 0;
  cart.totalAmount = 0;

  await cart.save();

  return cart;
};
