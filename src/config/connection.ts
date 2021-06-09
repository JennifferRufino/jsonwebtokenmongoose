import mongoose from 'mongoose';

const connection = () => {
    mongoose.connect('mongodb://localhost:27017/jsonwebtokens', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
    }, () => {
    console.log('Conectado ao banco de dados!');
    })
}
export default connection;