import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
    const [sku, setSku] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");

    const navigate = useNavigate()

    const addItem = async (e) => {
        e.preventDefault();
        const newItem = { sku, name, date, amount: Number.parseInt(amount, 10) };
        const response = await fetch(
            '/items', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newItem)
            }
        )
        if(response.status === 201) {
            alert("Successfully created a new item!");
            navigate('/');
        } else {
            alert("Failed to create a new item, status code " + response.status);
        }
        //navigate('/')
    }

    return (
        <div>
            <h1 className="page-title">Add Inventory</h1>
            <p className="home-p">Add the item you want to your inventory!</p>
            
            <section className="card">
                <form className="form" onSubmit={addItem}>
                    <div className="form-row">
                        <label className="label">Item SKU</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter Item SKU"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label className="label">Item Name</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter Item name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label className="label">Amount</label>
                        <input
                            className="input"
                            type="number"
                            placeholder="Enter Item Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
            
                    <div className="form-row">
                        <label className="label">Date</label>
                        <input
                            className="input"
                            type="date"
                            placeholder="Enter Date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <button className="add-btn" type="submit">Add Item</button>
                </form>
            </section>
        </div>
    );
}

export default Add;