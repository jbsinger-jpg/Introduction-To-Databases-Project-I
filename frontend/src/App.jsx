import { useEffect, useState } from 'react';
import './App.css';
import { PRODUCT_URL, RENTER_URL, SELLER_URL, getInitialData } from './backend_config';
import { getProductOwner } from './foreign_key_data';

function App() {
  const [renterData, setRenterData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [sellerData, setSellerData] = useState(null);

  useEffect(() => {
    getInitialData([
      { url: RENTER_URL, setData: setRenterData },
      { url: SELLER_URL, setData: setSellerData },
      { url: PRODUCT_URL, setData: setProductData },
    ]);
  }, []);

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
        Product ID 1 Owner:
      </div>
      <div>
        {(productData && sellerData) && getProductOwner(1, productData, sellerData)}
      </div>
    </div>
  );
}

export default App;
