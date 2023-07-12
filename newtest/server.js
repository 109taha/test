const express = require ("express");
const router = require ("./controller/registor");
const app = express();
app.get('/', (req, res) =>{
    res.send("<h1>server is running<h1>")
})
app.use(express.json());
app.use("/user", router)

const port = 3100;


app.listen(port);
console.log(`server is running on port ${port}`);