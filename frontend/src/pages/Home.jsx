import { useEffect, useState } from "react";
import InventoryTable from "../components/InventoryTable";

function Home() {
    const [items, setItems] = useState([]);
    const [query, setQuery] = useState("");

    const loadItems = async () => {
        const response = await fetch('/items')
        const data = await response.json();
        setItems(data)
    }
    useEffect(() => {
        loadItems()
    }, []);

    const onSearch = async (e) => {
        e.preventDefault();
        
        let url = "/items";
        if(query) {
            url = "/items?q=" + query;
        }
        const response = await fetch(url)
        const data = await response.json();
        setItems(data)
    };

    const onDelete = async (sku) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?") 

        if(!confirmDelete) {
            return;
        }

        const response = await fetch(
            `/items/${sku}`,
            {method: "DELETE"}
        );

        if (response.status === 204) {
            setItems(items.filter((i) => i.sku !== sku));
        } else {
            alert(`Failed to delete item with SKU: ${sku}`);
        }
    };

    return (
        <div className="page">
            <h1 className="page-title">Home</h1>
            <h2 className="lead">Welcome to the Inventory Management System!</h2>
            <p className="home-p">Keep track of all your inventory. Use the form to search by SKU or name.</p>
                <form className="search-form" onSubmit={onSearch}>
                    <input 
                        className="input"
                        type="text" 
                        placeholder="Search by SKU or item's name"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="btn" type="submit">Search</button>
                </form>
            <section className="card">
                <div>
                    <InventoryTable items={items} onDelete={onDelete} />
                </div>
            </section>
        </div>
    );
}

export default Home;