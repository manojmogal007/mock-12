const {connection}=require('./config/db')
const express=require('express')
const cors=require('cors')
const {productRouter}=require('./routes/product.route')


const app=express()
app.use(express.json())
app.use(cors())
app.use('/product',productRouter)



app.listen(4000,async()=>{
    try{
        await connection
        console.log('Connected to database')
    }catch(err){
        console.log(err)
        console.log('Database connection error')
    }
    console.log('Server started on port 4000')
})