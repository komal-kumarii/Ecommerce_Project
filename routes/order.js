module.exports = (order,orderdb,deliverydb,datetime,userdb)=>{

    // getting the total order list 
    order.get('/orders',(req,res)=>{
        orderdb.find()
        .then((orders)=>{
            res.send(orders)
        })
    })
    // placing the order by customer name
    order.post('/place/order',(req,res)=>{
        let dt = datetime.create();
        let formattedDate = dt.format('m/d/y ');
        let user = req.body.Customer_name
        userdb.find({},{first_name:1})
        .then((userData)=>{
            for(var i of userData){
                if(user == i.first_name){
                    orderdb.find()
                    .then((orders)=>{
                        var OrderDetails = new orderdb({
                            productName:req.body.productName,
                            Quantity:req.body.Quantity,
                            Customer_name:req.body.Customer_name,
                            OrderDate:formattedDate,
                        })
                        OrderDetails.save()
                        .then((orders)=>{
                            return res.send(orders)
                        })
                    })

                }
            }
            res.send('you have to sign-up first ohk')
            
            
        })
        .catch((err)=>{
                return res.send('You have to sign-up first ')

        })
    })

    order.get('/Totalorder/:Customer_name',(req,res)=>{
        var Customer_name = req.params.Customer_name;
        orderdb.find({Customer_name:{$eq:Customer_name}})

        .then((orders)=>{
            if(orders.length==0){
                res.send({'customer has to be place  order first ':Customer_name})
            }
            else{
                let quantity = 0
                for (var i of orders){
                    quantity+=parseInt(i.Quantity)
                    // res.send(i)
                }
                res.json({Total_orders:quantity})
            // console.log(orders)
            }
            
        })
        
    })
    // getting order details of placed ordereed product
    order.get('/orderSummary/particular',(req,res)=>{
        // var data = orderDB.find()
        let data = orderdb.aggregate([{
            $lookup:{
                from :"flipkarts",
                localField:"productName",
                foreignField:"productName",
                as:"order_Details" 
            },
        },
        ])
        // console.log(data)
        .then((order)=>{
            res.send(order)
        })
    })
    // at the time of payment 
    order.post('/order/:productName/payment',(req,res)=>{
        orderdb.findOne({productName:req.params.productName})
        .then((order)=>{
            let data = new deliverydb({
                productName:order.productName,
                Quantity:order.Quantity,
                Customer_name:order.Customer_name
            })
            data.save()
            .then((data)=>{
                orderdb.deleteOne({productName:req.params.productName})
                .then((data)=>{
                    res.send('you have been made your payment, your product will be deliver')
                })
            })
        })
    })

}