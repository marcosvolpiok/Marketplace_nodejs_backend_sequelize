class productController{
  constructor(productService) {
    this.productService=productService;
  }

  list = async (req, res) => {
    try{
      const product=await this.productService.list(req);
      res.json(product);
    }catch(e){
      res.status(500).json({message: e.message})
    }
    
  }

  listById = async (req, res) => {
    try{
      const product=await this.productService.listById(req, res);
      res.json(product);
    }catch(e){
      res.status(500).json({message: e.message})
    }
}

listByShop = async (req, res) => {
  try{
    const product=await this.productService.listByShop(req, res);
    res.json(product);
  }catch(e){
    res.status(500).json({message: e.message, stack: e.stack})
  }
}


}


module.exports = productController;