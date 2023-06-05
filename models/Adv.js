import mongoose from "mongoose";

const AdvSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'Advertise Title',
        required: [true,'Please provide all values'],
    },
    foodType: {
        type: String,
        enum: ['Homemade', 'Vegetables', 'Other'],
        default: 'Homemade',
        required: true,
    },
    details: {
        type: String,
        maxlength: 150,
        default: ' Add some more details'
    },
    advLocation: {
        type: String,
        default: 'my location',
        required: true,
    },
    status:{
        type:String,
        enum:['Open', 'Close'],
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }

},
    { timestamps: true }
)

export default mongoose.model('Adv', AdvSchema)