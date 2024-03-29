const req = require('express/lib/request');
const {
  shopServiceOb,
  productServiceOb,
  customerServiceOb,
  cartServiceOb,
  cartProductServiceOb,
  orderServiceOb
} = require('../dependencies/');

const resolvers = {
  Query: {
    async getShop(root, args, context) {
      context.req.url = 'getShop';
      return await shopServiceOb.list(context.req);
    },

    async getProduct(root, args, context) {
      context.req.url = 'getProducts';
      return await productServiceOb.list(context.req);
    },

    async getProductById(root, {id}, context) {
      context.req.params.id = id;
      context.req.url = `getProductById/${id}`;
      return await productServiceOb.listById(context.req);
    },

    async getProductByShop(root, {id}, context) {
      context.req.params.id = id;
      context.req.url = `getProductByShop/${id}`;
      return await productServiceOb.listByShop(context.req);
    },
    
    async getCustomer(root, args, context) {
      context.req.url = `getCustomers`;
      return await customerServiceOb.list(context.req);
    },  
    
    async getCart() {
      req = {};
      req.url = 'getCart';
      return await cartServiceOb.list(req);
    },

    async getCartByUser(root, args, context) {
      res = context.res
      return await cartServiceOb.listByIdUser(res);
    },

    async getCartByUserAndShop(root, args, context) {
      req = context.req;
      req.params.idShop = args.idShop;
      req.params.state = args.state;
      res = context.res;
      return await cartServiceOb.listByIdUserAndIdShop(req, res);
    },

    async getCartById(root, args, context) {
      req = context.req;
      req.params.idCart = args.idCart;
      res = context.res;

      return await cartProductServiceOb.listById(req, res);
    },

    async getOrder(root, args, context) {
      const req = context.req;
      req.url = 'getOrders';

      return await orderServiceOb.list(req);
    },
    
    async getOrderByCustomer(root, args, context) {
      const res = context.res;

      return await orderServiceOb.listByIdCustomer(res);
    },

    async getOrderByShop(root, args, context) {
      const res = context.res;

      return await orderServiceOb.listByIdShop(res);
    },

    async getOrderByIdAndHash(root, args, context) {
      const res = context.res;
      const req = context.req;
      req.params.id = args.idOrder;
      req.params.hash = args.hash;

      return await orderServiceOb.listById(req, res);
    },
  },

  Mutation: {
    async createCustomer(_, { input }) {
      req = {body: input};
      return await customerServiceOb.add(req);
    },

    async loginCustomer(_, { input }) {
      req = {body: input};
      return await customerServiceOb.login(req);
    },  
    
    async addCart(_, { input }, context) {
      res = context.res;
      req = {body: input};

      return await cartProductServiceOb.add(req, res);
    },

    async updateCart(_, { input }, context) {
      res = context.res;
      req = {body: input};

      return await cartProductServiceOb.update(req, res);
    },

    async createOrderFromCart(_, { input }, context) {
      const res = context.res;
      const req = {body: input};

      return await orderServiceOb.addFromCart(req, res);
    },    

    async updateOrder(_, { input }, context) {
      const res = context.res;
      const req = context.req;
      req.body = {id_state: input.idState};
      req.params = {id: input.idOrder};

      return await orderServiceOb.update(req, res);
    },
  }   
}

module.exports = resolvers