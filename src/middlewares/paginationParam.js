const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

const toPositiveInt = (value, defaultValue) => {
  const num = Number(value);
  return Number.isInteger(num) && num > 0 ? num : defaultValue;
};

export const paginationParam = (req, res, next) => {
  const { pageNumber, pageSize } = req.query;
  req.pagination = {
    pageSize: toPositiveInt(pageSize, DEFAULT_PAGE_SIZE),
    pageNumber: toPositiveInt(pageNumber, DEFAULT_PAGE_NUMBER),
  };
  req.pagination.offset =
    (req.pagination.pageNumber - 1) * req.pagination.pageSize;
  next();
};
