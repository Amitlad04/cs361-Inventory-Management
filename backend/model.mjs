import mongoose from 'mongoose';
import 'dotenv/config';

let connection = undefined
let Item;


async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

const itemsSchema = mongoose.Schema ({
    sku: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    date: {type: String, required: true},
    amount: {type: Number, required: true},
})

Item = mongoose.model('Item', itemsSchema);

const createItem = async (sku, name, date, amount) => {
    const item = new Item({sku: sku, name: name, date: date, amount: amount});
    return item.save()
}

const findItem = async (filter = {}) => {
    const find = Item.find(filter);
    return find.exec();
}

async function findItemBySku(sku) {
    const result = await Item.findOne({ sku });
    return result;
}

async function deleteItemBySku(sku) {
    const result = await Item.deleteOne({ sku: String(sku) });
    return result.deletedCount > 0;
}


export { connect, createItem, findItem, findItemBySku, deleteItemBySku }