import slugify from "slugify";

import Category from "./category.model";
import Product from "../product/product.model";

export const createCategoryService = async (payload: any) => {
  const slug = slugify(payload.name, {
    lower: true,
  });

  const exists = await Category.findOne({
    slug,
  });

  if (exists) {
    throw new Error("Category already exists");
  }

  return Category.create({
    ...payload,
    slug,
  });
};

export const createBulkCategoryService = async (payload: any[]) => {
  const categories = payload.map((category) => ({
    ...category,
    slug: slugify(category.name, { lower: true }),
  }));

  const slugs = categories.map((c) => c.slug);

  const existing = await Category.find({
    slug: { $in: slugs },
  });

  if (existing.length > 0) {
    throw new Error(
      `Categories already exist: ${existing
        .map((c) => c.name)
        .join(", ")}`
    );
  }

  return Category.insertMany(categories);
};

export const getCategoriesService = async () => {
  const categories = await Category.find().sort({
    createdAt: -1,
  });

  return categories;
};

export const getCategoryByIdService = async (id: string) => {
  return Category.findById(id);
};

export const updateCategoryService = async (id: string, payload: any) => {
  const slug = slugify(payload.name, {
    lower: true,
  });

  return Category.findByIdAndUpdate(
    id,
    {
      ...payload,
      slug,
    },
    {
      new: true,
    },
  );
};

export const deleteCategoryService = async (id: string) => {
  return Category.findByIdAndDelete(id);
};

export const getCategoryStatsService = async () => {
  const stats = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        totalProducts: {
          $sum: 1,
        },
      },
    },
  ]);

  return stats;
};
