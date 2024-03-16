import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    streetAddress: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    zipCode: {
        type: String,
        required: true,
        trim: true
    },
    username:{
        type:String,
        required: true
    }
});


addressSchema.index({ streetAddress: 1, country : 1, city: 1, state: 1, zipCode: 1 }, { unique: true });

const Address = mongoose.model('Address', addressSchema);

export default Address;
