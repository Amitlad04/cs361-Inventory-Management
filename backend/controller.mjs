import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as itemModel from './model.mjs';


const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.post('/items', asyncHandler(async(req, res) => {
    const { sku, name, date, amount } = req.body;
        
    if(!sku || !name || !date || amount === undefined) {
        return res.status(400).json({ Error: "Invalid request" });
    }
    if(!Number.isInteger(amount) || amount <= 0) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    const items = await itemModel.createItem(sku, name, date, amount);
    res.status(201).json(items);
}));

app.get('/items', asyncHandler(async(req, res) => {
    const q = req.query.q;

    if (!q) {
        const items = await itemModel.findItem({});
        return res.status(200).json(items);
    }

    const filter = {
        $or: [
            { name: { $regex: q, $options: 'i' } },
            { sku: { $regex: q, $options: 'i' } }
        ]
    }; // for searching 

    const getItems = await itemModel.findItem(filter);
    res.status(200).json(getItems);
}))

app.get('/items/:sku', asyncHandler(async(req, res) => {
    const item = await itemModel.findItemBySku(req.params.sku);

    if(!item) {
        return res.status(404).json({ Error: "Not found"});
    }
    res.status(200).json(item);
}))

app.delete('/items/:sku', asyncHandler(async(req, res) => {
    const deleted = await itemModel.deleteItemBySku(req.params.sku)

    if(!deleted) {
        res.status(404).json({ Error: "Not found"})
    } else {
        res.status(204).send();
    }
}))

app.listen(PORT, async () => {
    await itemModel.connect(false)
    console.log(`Server listening on port ${PORT}...`);
});