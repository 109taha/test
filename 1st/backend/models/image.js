const mongoose = required("mongoose");
const imageSchema =mongoose.Schema({
    name:{
        type: string,
        required: true,
    },
    ImageData:{
        data: Buffer,
        contentType: string
    }
})

module.export = ImageModel = mongoose.model('imageModel', imageSchema);
