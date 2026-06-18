import { Request, Response } from "express";

import * as CategoryService from "./category.service";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await CategoryService.createCategoryService(req.body);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const createBulkCategory = async (req: Request, res: Response) => {
  try {
    const categorys = await CategoryService.createBulkCategoryService(req.body);

    res.status(201).json({
      success: true,
      data: categorys,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await CategoryService.getCategoriesService();

  res.json({
    success: true,
    data: categories,
  });
};

export const getCategoryById = async (req: Request, res: Response) => {
  const category = await CategoryService.getCategoryByIdService(
    req.params.id as string,
  );

  res.json({
    success: true,
    data: category,
  });
};

export const updateCategory = async (req: Request, res: Response) => {
  const category = await CategoryService.updateCategoryService(
    req.params.id as string,
    req.body,
  );

  res.json({
    success: true,
    data: category,
  });
};

export const deleteCategory = async (req: Request, res: Response) => {
  await CategoryService.deleteCategoryService(req.params.id as string);

  res.json({
    success: true,
    message: "Category deleted successfully",
  });
};

export const getCategoryStats = async (req: Request, res: Response) => {
  const stats = await CategoryService.getCategoryStatsService();

  res.json({
    success: true,
    data: stats,
  });
};
