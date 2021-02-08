module.exports = (orderdb,userdb,TotalOrders)=>{
    TotalOrders.get('/CustomerWiseOrders',(req,res)=>{
        var data = userdb.aggregate([
            {
                $lookup:{
                    from:"orders",
                    localField:"first_name",
                    foreignField:"Customer_name",
                    as:"Total_orderSummary"
                },
            
            }
        ])
        .then((data)=>{
                res.send(data)
            // res.send(data)
        })
    })
}