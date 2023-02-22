const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('db online')
        
    } catch (error) {
        console.log(error.message)
        throw new Error('Error a la hira de inicializar base de datos')
    }
};

module.exports = {
    dbConection
}