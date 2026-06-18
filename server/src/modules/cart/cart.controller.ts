import { Request, Response } from "express";

import * as CartService from "./cart.service";

export const getCart = async (req: any, res: Response) => {
  const cart = await CartService.getCartService(req.user.id as string);

  res.json({
    success: true,
    data: cart,
  });
};

export const addToCart = async (req: any, res: Response) => {
  try {
    const cart = await CartService.addToCartService(
      req.user.id,
      req.body.productId,
      req.body.quantity,
    );

    res.json({
      success: true,
      data: cart,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCartItem = async (req: any, res: Response) => {
  const cart = await CartService.updateCartItemService(
    req.user.id,
    req.params.productId as string,
    req.body.quantity,
  );

  res.json({
    success: true,
    data: cart,
  });
};

export const removeCartItem = async (req: any, res: Response) => {
  const cart = await CartService.removeCartItemService(
    req.user.id,
    req.params.productId as string,
  );

  res.json({
    success: true,
    data: cart,
  });
};

export const clearCart = async (req: any, res: Response) => {
  await CartService.clearCartService(req.user.id as string);

  res.json({
    success: true,
    message: "Cart cleared successfully",
  });
};
