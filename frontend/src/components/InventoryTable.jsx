import { IoIosInformationCircleOutline } from "react-icons/io";


function InventoryTable({ items, onDelete }) {
    return (
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Item Name</th>
              <th>Current Inventory</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.sku}>
                <td>{item.sku}</td>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>
                  <span className="info-icon" title={`SKU: ${item.sku}\n Name: ${item.name}\n Inventory: ${item.amount}\n Date: ${item.date}`} >
                    <IoIosInformationCircleOutline />
                  </span>
                </td>
                <td>
                  <button className="btn">
                    <a href="/add-item">Add</a>
                  </button>
                </td>
                <td>
                  <button
                    className="btn delete_row"
                    onClick={() => onDelete(item.sku)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default InventoryTable;