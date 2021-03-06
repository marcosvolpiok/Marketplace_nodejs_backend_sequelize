class shopController{
  constructor(shopService) {
    this.shopService=shopService;
  }

  list = async (req, res) => { 
    //res.json([{'name': 'mikona', 'id': 1234}, {'name': 'misoni', 'id': 4567}]);
    try{
      const shop=await this.shopService.list(req);
      res.json(shop);
    }catch(e){
      res.status(500).json({message: e.message, stack: e.stack})
    }
    
  }
}


module.exports = shopController;