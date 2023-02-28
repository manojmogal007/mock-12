const mongoose=require('mongoose')


const productShema=mongoose.Schema({
    name:String,
    description:String,
    category:String,
    image:String,
    location:String,
    date:String,
    price:Number,
})

const Productmodel=mongoose.model('product',productShema)

module.exports={Productmodel}