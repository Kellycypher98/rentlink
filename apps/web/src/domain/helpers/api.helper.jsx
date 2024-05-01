export const ApiHelper = {
  FilterCondition: {
    eq: undefined, // Equal to
    neq: undefined, // Not equal to
    gt: undefined, // Greater than
    gte: undefined, // Greater than or equal to
    lt: undefined, // Less than
    lte: undefined, // Less than or equal to
    in: undefined, // In array
    nin: undefined, // Not in array
    like: undefined, // case sensitive
    ilike: undefined, // not case sensitive
  },

  QueryOptions: {
    filters: {},
    orders: {},
    includes: [],
    pagination: {
      page: undefined,
      countItems: undefined,
    },
  },

  buildQueryOptions(options) {
    if (options) {
      const encodedOptions = encodeURIComponent(JSON.stringify(options));
      return `?queryOptions=${encodedOptions}`;
    } else {
      return ``;
    }
  },
};
