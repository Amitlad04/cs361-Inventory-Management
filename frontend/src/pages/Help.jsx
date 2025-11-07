
function Help() {
    return (
        <div className="page">
            <h1 className="page-title">Helpful Information</h1>             
            
            <section className="card">
                <h2 className="section-title">How to use this site</h2>
                <h3 className="help-h3">This page shows how to navigate the inventory app.</h3>
                <ol className="list">
                    <li>On Home, you will see a table showing inventory</li>
                    <li>Go to <strong>Add Item</strong> to add inventory.</li>
                    <li>Fill in SKU, Name, Amount, and Date.</li>
                    <li>View all items on the Home page</li>
                    <li>On Home, you will see a table showing inventory</li>
                    <li>Use <strong>Delete</strong> to remove an item if needed.</li>
                    <li>If you want to see more information about the item, click the <strong>i</strong>.</li>
                </ol>
            </section>
        </div>
    );
}

export default Help;