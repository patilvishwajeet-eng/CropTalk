import mongoose from 'mongoose';

const logindataSchema = new mongoose.Schema({
    uname: {
        type: String,
        required: (true,'Username is required')
    },
    email: {
        type: String,
        required: (true,'Username is required')
    },
    password: {
        type: String,
        required: (true,'Username is required')
    },
})

export default mongoose.model('logindata',logindataSchema);