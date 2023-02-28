const express=require('express')
const {Productmodel}=require('../model/product.model')


const productRouter=express.Router()

productRouter.post('/addproduct',async(req,res)=>{
    try{
        const new_product=new Productmodel(req.body)
        await new_product.save()
        res.send({'msg':'Product added successfully'})
    }catch(err){
        console.log(err)
        res.send({'msg':'Not able to add product'})
    }
})

productRouter.get('/allproducts',async(req,res)=>{
    try{
        const all=await Productmodel.find()
        res.send({'msg':'All products','products':all})
    }catch(err){
        console.log(err)
        res.send({'msg':'Not able to get products'})
    }
})

productRouter.get('/filter',async(req,res)=>{
    const query=req.query
    try{
        if(query.category&&query.order&&query.page){
            const page=Number(query.page)*4
            if(query.order==='asc'){
                const pro=await Productmodel.find({category:query.category}).sort({date:1}).skip(page).limit(4)
                res.send({'msg':'All products','product':pro})
            }else{
                const pro=await Productmodel.find({category:query.category}).sort({date:-1}).skip(page).limit(4)
                res.send({'msg':'All products','product':pro})
            }
        }else if(query.order&&query.page){
            const page=Number(query.page)*4
            if(query.order==='asc'){
                const pro=await Productmodel.find().sort({date:1}).skip(page).limit(4)
                res.send({'msg':'All products','product':pro})
            }else{
                const pro=await Productmodel.find().sort({date:-1}).skip(page).limit(4)
                res.send({'msg':'All products','product':pro})
            }
        }else if(query.category&&query.page){
            const page=Number(query.page)*4
            const pro=await Productmodel.find({category:query.category}).skip(page).limit(4)
            res.send({'msg':'All products','product':pro})
        }else if(query.category){
            const pro=await Productmodel.find({category:query.category})
            res.send({'msg':'All products','product':pro})
        }else if(query.order==='asc'){
            const pro=await Productmodel.find().sort({date:1})
            res.send({'msg':'All products','product':pro})
        }else if(query.order==='desc'){
            const pro=await Productmodel.find().sort({date:-1})
            res.send({'msg':'All products','product':pro})
        }else if(query.page){
            const page=Number(query.page)*4
            const pro=await Productmodel.find().skip(page).limit(4)
            res.send({'msg':'All products','product':pro})
        }else if(query.name){
            const pro=await Productmodel.find({name:{$regex:`${query.name}`}})
            res.send({'msg':'All products','product':pro})
        }else{
            const all=await Productmodel.find()
            res.send({'msg':'All products','product':all})
        }

    }catch(err){
        console.log(err)
        res.send({'msg':'Not able to get products'})
    }
})

productRouter.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id
    // console.log(id)
    try{
        await Productmodel.findByIdAndDelete({_id:id})
        res.send({'msg':'Product deleted'})
    }catch(err){
        console.log(err)
        res.send({'msg':'Product delete error'})
    }
})


module.exports={productRouter}









// {
//     "name":"jordans",
//     "description":"sports shoes",
//     "category":"shoes",
//     "image":"https://tse1.mm.bing.net/th?id=OIP.bJLa9M0tgCmqJl8_wHbumAHaE8&pid=Api&rs=1&c=1&qlt=95&w=154&h=103",
//     "location":"nashik",
//     "date":"28-02-2023",
//     "price":2300
//   }