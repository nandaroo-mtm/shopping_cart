const express = require("express");
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

const products = require('./products')

app.get('/', (req, res) => {
    res.send("Welcome to our online shop API");
})

app.get('/products', (req, res) => {
    res.send(products);
});

app.get(`/products/:id`, (req, res) => {
    const product = products.filter(product => {
        return product.id == req.params.id
    })
    res.send(product);
})

const port = process.env.PORT || 5000;

app.listen(5000, console.log(`Server running on port ${port}`));