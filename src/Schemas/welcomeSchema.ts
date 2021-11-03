import mongoose, { Schema, Document } from 'mongoose';

export interface WelcomeSchema extends Document {
    _id: String,
    channelID: String,
    message: String,
}

const schema: Schema = new Schema({
    _id: { type: String, required: true },
    channelID: { type: String, required: true },
    message: { type: String, required: true },
})

export default mongoose.model<WelcomeSchema>('Welcomes', schema);