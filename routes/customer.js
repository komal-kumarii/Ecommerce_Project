module.exports = (customer, userdb,jwt)=>{
    customer.get('/customer',(req,res)=>{
        userdb.find()
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
        })
    })

    customer.post('/signup',(req,res)=>{
        let phone_number = req.body.phone_number
        let password = req.body.password
        // console.log(phone_number.length)
        userdb.find()
        .then((data)=>{
            if(req.body.phone_number==undefined || req.body.password ==undefined ){
                return res.send('first fill this details ')
            }
            // console.log()
            else{
                // console.log(phone_number.length)
                if(phone_number.length == 10){
                    var newUser = new userdb({
                        first_name:req.body.first_name,
                        last_name:req.body.last_name,
                        phone_number:req.body.phone_number,
                        email:req.body.email,
                        password:req.body.password,
                        pincode:req.body.pincode,
                        locality:req.body.locality,
                        address :req.body.address,
                        city:req.body.city,
                        state:req.body.state
                    })
                    if(password.length<6){
                        return res.send('password must be strong')
                    }
                    if(req.body.pincode == undefined ||req.body.state==undefined||req.body.city==undefined ){
                        return res.send('Incompleted address ')
                    }
                    else{
                        newUser.save()
                        .then((data)=>{
                            console.log('Congratulations you are succesfully sign-up')
                            return res.send('Congratulations you are succesfully sign-up')
                        })
                        .catch((err)=>{
                            return res.send(err)
                        })
                    }
                    
                // }    
                }
                else{
                    return res.send('invalid phone number')
                }
                
            }    
        })
        .catch((err)=>{
            return res.send(err)
        })   
        // })
    })

    customer.post('/login',(req,res)=>{
        let email = req.body.email
        userdb.findOne({email:req.body.email})
        .then((data)=>{
            if(data == null){
                console.log('you need to sign-up')
                return res.send('you need to sign-up')
            }
            else{
                if(data.password == req.body.password){
                    let token = jwt.sign({email:email._id},"secretKey")
                    res.cookie("token ",token)
                    return res.send("token generted ---")
                }
                else{
                    return res.send(" password is wrong ")
                }
            }
        })
    })

    // for making changes 
    customer.put('/update/:first_name',(req,res)=>{
        let token = req.headers.cookie
        if(token){
            let token1 = token.slice(6)
            jwt.verify(token1,'secretKey',(err,decoded)=>{
                if(!err){
                    userdb.updateOne({first_name:req.params.first_name},{$set:{
                        first_name:req.body.first_name,
                        last_name:req.body.last_name,
                        phone_number:req.body.phone_number,
                        email:req.body.email,
                        password:req.body.password,
                        pincode:req.body.pincode,
                        locality:req.body.locality,
                        address :req.body.address,
                        city:req.body.city,
                        state:req.body.state
                    }})
                    .then((data)=>{
                        console.log('data has been succefully updated')
                        return res.send('data has been succefully updated')
                    })
                }
                else{
                    return res.send(err)
                }
            })
        }
        else{
            res.send('Authorization required')
        }
    })

    customer.post('/logout',(req,res)=>{
        res.clearCookie("token")
        return res.send('logout successfully')
    })

}