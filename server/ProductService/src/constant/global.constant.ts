export const SELECT_SINGLE_UNIT = {
  id: true,
  name: true,
};
export const SELECT_SINGLE_CATEGORY = {
  id: true,
  name: true,
  slug: true,
  priority: true,
};

export const SELECT_SINGLE_PRICE = {
  id: true,
  unit: SELECT_SINGLE_UNIT,
};

export const SELECT_SINGLE_WAREHOUSE = {
  id: true,
  name: true,
  address: true,
};
export const SELECT_SINGLE_FILE = {
  id: true,
  name: true,
  link: true,
  description: true,
  role: true,
};

export const SELECT_SINGLE_QUANTITY = {
  id: true,
  quantity: true,
  unit: SELECT_SINGLE_UNIT,
  warehouse: SELECT_SINGLE_WAREHOUSE,
};
export const SELECT_SINGLE_PRODUCT_CONSTANT = {
  id: true,
  name: true,
  slug: true,
  description: true,
  content: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  category: SELECT_SINGLE_CATEGORY,
  quantity: SELECT_SINGLE_QUANTITY,
};

export const SELECT_PAGING_PRODUCT_CONSTANT = {
  id: true,
  name: true,
  slug: true,
  description: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  category: SELECT_SINGLE_CATEGORY,
  file: SELECT_SINGLE_FILE,
};
