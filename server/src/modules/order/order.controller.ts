import { Request, Response } from "express";

import * as OrderService from "./order.service";

export const createOrder = async (req: any, res: Response) => {
  try {
    const order = await OrderService.createOrderService(req.user.id, req.body);

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyOrders = async (req: any, res: Response) => {
  const orders = await OrderService.getMyOrdersService(req.user.id);

  res.json({
    success: true,
    data: orders,
  });
};

export const getOrder = async (req: Request, res: Response) => {
  const order = await OrderService.getOrderService(req.params.id as string);

  res.json({
    success: true,
    data: order,
  });
};

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await OrderService.getAllOrdersService();

  res.json({
    success: true,
    data: orders,
  });
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const order = await OrderService.updateOrderStatusService(
    req.params.id as string,
    req.body.status,
  );

  res.json({
    success: true,
    data: order,
  });
};

export const analytics = async (req: Request, res: Response) => {
  const data = await OrderService.orderAnalyticsService();

  res.json({
    success: true,
    data,
  });
};
