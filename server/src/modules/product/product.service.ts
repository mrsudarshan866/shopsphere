import Product from "./product.model";

export const getProductsService = async (query: any) => {
  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 12;

  const skip = (page - 1) * limit;

  const filter: any = {};

  if (query.keyword) {
    filter.$text = {
      $search: query.keyword,
    };
  }

  if (query.category) {
    filter.category = query.category;
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
  }

  if (query.minPrice) {
    filter.price.$gte = Number(query.minPrice);
  }

  if (query.maxPrice) {
    filter.price.$lte = Number(query.maxPrice);
  }

  let sort: any = {
    createdAt: -1,
  };

  if (query.sort === "priceAsc") {
    sort = { price: 1 };
  }

  if (query.sort === "priceDesc") {
    sort = { price: -1 };
  }

  const products = await Product.find(filter)
    .populate("category")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(filter);

  return {
    products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const createProductService = async (payload: any) => {
  return Product.create(payload);
};

export const getProductByIdService = async (id: string) => {
  return Product.findById(id).populate("category");
};

export const updateProductService = async (id: string, payload: any) => {
  return Product.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

export const deleteProductService = async (id: string) => {
  return Product.findByIdAndDelete(id);
};
