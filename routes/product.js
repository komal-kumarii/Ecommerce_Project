module.exports = (product ,productdb,sellerdb)=>{
    // total products 
    product.get('/flipkart/product',(req,res)=>{
        productdb.find()
        .then((data)=>{
            // console.log("ggg")
            res.send(data)
        })
    })

    //  for getting the category of product
    product.get('/list',(req,res)=>{
        productdb.find({},{"category":1})
        .then((data)=>{
            var unique = [ ];
            for(var i = 0; i<data.length;i++){
                unique.push(data[i]["category"])
            }
        //    res.send(unique)
            var val = Array.from(new Set(unique))
            console.log(val)
            res.send(val)
        })
        .catch((err)=>{
            res.send(err)
        })
    })

    // getting the brand of particular category
    product.get('/list/product/:category',(req,res)=>{
        var categor = req.params.category
        productdb.find({category:{$eq:categor}},{brand:1})
        .then((data)=>{
            var brnd = []
            for(var c=0; c<data.length; c++){
                brnd.push(data[c]["brand"])
            }
            // console.log(brnd)
            var categ = Array.from(new Set(brnd))
            res.send(categ)
            console.log(categ)
        })
    })

    // you can view the particular product by their
    // //  brand name 
    product.get('/list/products/:brand',(req,res)=>{
        var brand = req.params.brand
        productdb.find({brand:{$eq:brand}})
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
        })
    })
    // viewing product by their name
    product.get('/electronics/:productName',(req,res)=>{
        var productName = req.params.productName
        productdb.find({productName:{$eq:productName}})
        
        .then((data)=>{
            
            res.send(data)
            console.log(data)
        })
    })

    // posting or adding a new product

    product.post('/post/product',(req,res)=>{
        productdb.find()
        .then((data)=>{
            var newProduct = new productdb({
                productName :req.body.productName,
                brand:req.body.brand,
                category:req.body.category,
                price:req.body.price,
                camera:req.body.camera,
                memory:req.body.memory,
                screen:req.body.screen,
                Processor:req.body.Processor,
                Generation:req.body.Generation,
                Battery:req.body.Battery,
                HardDisk:req.body.HardDisk,
                Operating_system:req.body.Operating_system,
                Display:req.body.Display,
                seller:req.body.seller
            })
            newProduct.save()
            .then((data)=>{
                let newSeller = new sellerdb({
                    seller_name:req.body.seller_name
                })
                newSeller.save()
                .then((seller)=>{
                    res.send('product is being posted')
                    // console.log(' product is being posted')
                })
            })
        })
    })
    
    product.put('/Update/:productName',(req,res)=>{
        var productName= req.params.productName
        productdb.updateOne({productName:req.params.productName},{$set:{
            productName :req.body.productName,
                brand:req.body.brand,
                category:req.body.category,
                price:req.body.price,
                camera:req.body.camera,
                memory:req.body.memory,
                screen:req.body.screen,
                Processor:req.body.Processor,
                Generation:req.body.Generation,
                Battery:req.body.Battery,
                HardDisk:req.body.HardDisk,
                Operating_system:req.body.Operating_system,
                Display:req.body.Display,
                seller:req.body.seller
        }})
        .then((data)=>{
            res.send('your data has been updated')
            console.log('your data has been updated')
        })
    })
    
    // laptop  less price according
    product.get('/laptops/less/:price',(req,res)=>{
        let category = req.body.category
        let price = req.body.price
        productdb.find({$and:[{category:{$eq:"laptops"}},{price:{$lt:(req.params.price)}}]})
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
        })
    })

    // laptop more price then preddefined
    product.get('/laptops/more/:price',(req,res)=>{
        let category = req.body.category
        let price = req.body.price
        productdb.find({$and:[{category:{$eq:"laptops"}},{price:{$gt:parseInt(req.params.price)}}]})
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
        })
    })

    // mobile less price
    product.get('/mobiles/less/:price',(req,res)=>{
        let category = req.body.category
        let price = req.body.price
        productdb.find({$and:[{category:{$eq:"mobiles"}},{price:{$lt:(req.params.price)}}]})
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
        })
    })

    // mobile more price
    product.get('/mobiles/more/:price',(req,res)=>{
        let category = req.body.category
        let price = req.body.price
        productdb.find({$and:[{category:{$eq:"mobiless"}},{price:{$gt:(req.params.price)}}]})
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
        })
    })

    //  name of sellers
    product.get('/seller',(req,res)=>{
        sellerdb.find()
        .then((sellers)=>{
            res.send(sellers)
        })
    })
    // sellers name k product 
    product.get('/sellersProduct',(req,res)=>{
        sellerdb.find()
        .then((record)=>{
            // res.send(record[1].seller_name)
            let data = sellerdb.aggregate(
                [
                    {
                        $lookup:{
                            from:"flipkarts",
                            localField:"seller_name",
                            foreignField:"seller",
                            as:"Their_products"
                        }
                    },
                    // {$project:{seller:0}}
                ]
            )
            .then((datas)=>{
                res.send(datas)
            })
        })
    })
        
    product.post('/postingSeller',(req,res)=>{
            sellerdb.find()
            .then((sellers)=>{
                let seller = new sellerdb({
                    seller_name:req.body.seller_name
                })
                seller.save()
                .then((sellers)=>{
                    res.send('we  posted the data ')
                })
            })
    })
}

