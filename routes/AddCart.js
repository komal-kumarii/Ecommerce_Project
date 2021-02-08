module.exports = (AddToCarts,addCart,productdb,orderdb,datetime)=>{

    // getting the cart by customer_name
    addCart.get('/get/:Customer_name',(req,res)=>{
        AddToCarts.find({Customer_name:req.params.Customer_name})
        .then((products)=>{
            if(products.length>0){
                res.send(products)
                console.log(products)
            }
            else{
                res.send(' Your cart is empty! Add items to it now.')
            }
        })
        .catch((err)=>{
            res.send(err)
        })
    })

    // adding product by produuct name
    addCart.post('/addToCarts/:productName',(req,res)=>{
        productdb.find({productName:req.params.productName})
        .then((data)=>{
            if(data==null){
                res.send('product is not available')
            }
            else{
                AddToCarts.find({productName:req.params.productName})
                .then((added)=>{
                    // res.send('added')
                    if(added.length==0){
                        let Addproduct = new AddToCarts({
                            productName:data[0].productName,
                            price:data[0].price,
                            seller:data[0].seller,
                            Quantity:req.body.Quantity,
                            Customer_name:req.body.Customer_name
                        })
                        Addproduct.save()
                        .then((productAdded)=>{
                            res.send(' product has been added to your cart ')
                        })
                        .catch((err)=>{
                            res.send(err)
                        })
                    }
                    else{
                            if(added.length>=1){
                                AddToCarts.updateOne({productName:req.params.productName},{$set:{
                                        Quantity:req.body.Quantity+1
                                }})
                                .then((updatedated)=>{
                                    res.send('your data has been added to your cart')
                                })
                                .catch((err)=>{
                                    res.send(err)
                                })
                            }

                    }
                })
                .catch((err)=>{
                    res.send(err)
                })
                
            }
        })
        .catch((err)=>{
            res.send(err)
        })
    })

    // for removing the product from the users's cart
    addCart.delete('/remove/:productName',(req,res)=>{
        AddToCarts.findOne({productName:req.params.productName})
        .then((myProduct)=>{
            // res.json(myProduct.Quantity)
            if(myProduct.Quantity>1){
                AddToCarts.updateOne({productName:req.params.productName},{$set:{
                    Quantity:myProduct.Quantity-1
                }})
                .then((data)=>{
                    res.send('your product Quantity is being reduced')
                })
                .catch((err)=>{
                    res.send(err)
                })
            }
            else{
                // console.log('komal')
                AddToCarts.deleteOne({productName:req.params.productName})
                .then((carts)=>{
                    res.send('your product has been deleted')
                })
                
            }
        })
    })

    // placing order from your cart
    addCart.post('/addtocarts/placeOrder/:Customer_name',(req,res)=>{
        AddToCarts.find({Customer_name:req.params.Customer_name})
        .then((data)=>{
            if(data.length>0){
                let dt = datetime.create();
                let formattedDate = dt.format('m/d/y ')
                for(var i of data){
                    let orders = new orderdb({
                        productName:i.productName,
                        Quantity:i.Quantity,
                        Customer_name:i.Customer_name,
                        OrderDate:formattedDate,
                    })
                    orders.save()
                }
                AddToCarts.deleteMany({Customer_name:req.params.Customer_name})
                .then((data)=>{
                    res.send('your has being ordered')
                })
                .catch((err)=>{
                    res.send(err)
                })

            }
        })

    })

}