import { Request, Response } from "express";

import * as ProductService from "./product.service";

export const createProduct = async (req: Request, res: Response) => {
  const product = await ProductService.createProductService(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
};

export const getProducts = async (req: Request, res: Response) => {
  const products = await ProductService.getProductsService(req.query);

  res.json({
    success: true,
    ...products,
  });
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await ProductService.getProductByIdService(
    req.params.id as string,
  );

  res.json({
    success: true,
    data: product,
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await ProductService.updateProductService(
    req.params.id as string,
    req.body,
  );

  res.json({
    success: true,
    data: product,
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  await ProductService.deleteProductService(req.params.id as string);

  res.json({
    success: true,
    message: "Product deleted",
  });
};
