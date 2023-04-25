import mongoose from 'mongoose'
import mogoose from 'mongoose'



const connectDB = (url) =>{
    return mongoose.connect(url)
}
export default connectDB