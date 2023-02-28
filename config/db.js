const mongoose=require('mongoose')


const connection=mongoose.connect('mongodb+srv://manojmogal:manojmogal@cluster0.iehcslr.mongodb.net/olxclassified?retryWrites=true&w=majority')


module.exports={connection}