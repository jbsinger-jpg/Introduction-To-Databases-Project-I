import { useEffect, useState } from 'react';
import './App.css';
import { PRODUCT_OWNER_URL, PRODUCT_URL, RENTER_URL, SELLER_URL, getInitialData } from './backend_config';

function App() {
  const [renterData, setRenterData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [productOwners, setProductOwners] = useState(null);
  const [productOwnerByProductId, setProductOwnerByProductId] = useState(null);

  useEffect(() => {
    getInitialData([
      { url: RENTER_URL, setData: setRenterData },
      { url: SELLER_URL, setData: setSellerData },
      { url: PRODUCT_URL, setData: setProductData },
      { url: PRODUCT_OWNER_URL, setData: setProductOwners },
      { url: PRODUCT_OWNER_URL + "/1", setData: setProductOwnerByProductId },
    ]);
  }, []);

  const addRenter = async (event) => {
    event.preventDefault();

    await fetch(RENTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 4,
        first_name: "Jacob",
        last_name: "Singer",
        address: "935 Alabama Rd.",
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success: ' + JSON.stringify(data));
      })
      .catch((error) => {
        console.error('Error: ' + error);
      });
  };

  return (
    <div>
      <table>
        <thead>
          <th>
            ID
          </th>
          <th>
            First Name
          </th>
          <th>
            Last Name
          </th>
          <th>
            Address
          </th>
        </thead>
        <tbody>
          {renterData && renterData.map(renter => {
            return (
              <tr key={renter.id}>
                <td>{renter.id}</td>
                <td>{renter.first_name}</td>
                <td>{renter.last_name}</td>
                <td>{renter.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table>
        <thead>
          <th>
            ID
          </th>
          <th>
            Description
          </th>
          <th>
            Price
          </th>
          <th>
            Owner
          </th>
        </thead>
        <tbody>
          {productData && productData.map(product => {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table>
        <thead>
          <th>
            ID
          </th>
          <th>
            First Name
          </th>
          <th>
            Last Name
          </th>
          <th>
            Address
          </th>
        </thead>
        <tbody>
          {sellerData && sellerData.map(seller => {
            return (
              <tr key={seller.id}>
                <td>{seller.id}</td>
                <td>{seller.first_name}</td>
                <td>{seller.last_name}</td>
                <td>{seller.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        ==============================================================
      </div>
      <div>
        All Product Owners:
      </div>
      <div>
        {productOwners && productOwners.map((productOwner, i) => {
          return (
            <div key={i}>
              {productOwner.first_name} {productOwner.last_name}
            </div>
          );
        })}
      </div>
      <div>
        ==============================================================
      </div>
      <div>
        ==============================================================
      </div>
      <div>
        Specified by ID:
      </div>
      <div>
        {productOwnerByProductId && productOwnerByProductId.map((productOwner, i) => {
          return (
            <div key={i}>
              {productOwner.first_name} {productOwner.last_name}
            </div>
          );
        })}
      </div>
      <div>
        ==============================================================
      </div>
      <button
        onClick={addRenter}
      >
        Create renter
      </button>
    </div>
  );
}

export default App;
