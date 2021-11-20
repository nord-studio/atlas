import mongoose, { Schema, Document } from 'mongoose';

export interface VolumeSchema extends Document {
    _id: String,
    volume: Number,
}

const schema: Schema = new Schema({
    _id: { type: String, required: true },
    volume: { type: Number, required: true },
})

export default mongoose.model<VolumeSchema>('Volumes', schema);