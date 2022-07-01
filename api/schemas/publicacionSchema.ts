import mongoose from "mongoose";

const PublicacionSchema = new mongoose.Schema(
    {

        description: { type: String, required: true },
        file: { type: String! },
        user: { type: mongoose.Types.ObjectId }   //guarda relacion con user
    },
    {
        timestamps: true
    }
)

export default PublicacionSchema;