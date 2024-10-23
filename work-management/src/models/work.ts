import mongoose, { Schema } from "mongoose";

const WorkSchema = new Schema({
    title: {
        type: String,
        required: true
        },
    content: {
        type: String,
        required: true
        },
    addedDate: {
        type: Date,
        required:true,
        default:Date.now
        },
    status: {
        type: String,
        enum: ['pending', 'completed','Started'],
        default:"pending"
    },
    userid:{
        type: Schema.Types.ObjectId,
        required:true
    }

})

export const Work = mongoose.models.Work || mongoose.model("Work",WorkSchema)