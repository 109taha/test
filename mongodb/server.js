const mongoose = require('mongoose');

try {
    mongoose.connect('mongodb://localhost/playground');
    console.log('mogodb connect ...')
    } catch (error) {
        console.log('could not connect mongodb ....', error)
    }

    // asssssssssssssssdasdasdasdasdadasdasdasdasdasasdasdaadsa