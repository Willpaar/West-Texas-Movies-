import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
const Itempage = () => {
    const id = useParams();
    const location = useLocation();
    const item = location.state?.item;
  return (
    <div>
      {/* <p className="">{item.name}</p>
      <p className="">{item.description}</p>
      <p className="">{item.storage}</p> */}

      <div className="imageContainer">
                <img src="" alt="" className="" />
            </div>
            <div className="informationFlex">
                <div className="NameandDescription">
                    <h1 className="name">{item.name}</h1>
                    <p className=""><span className="descriptionLabel">Storage:</span> {item.storage}</p>
                    <p className=""><span className="descriptionLabel">RAM:</span> {item.ram}</p>
                    <p className=""><span className="descriptionLabel">Camera:</span> {item.camera}</p>
                    <p className=""><span className="descriptionLabel">Battery:</span> {item.battery}</p>
                    <p className=""><span className="descriptionLabel">Brand:</span> {item.brand}</p>
                    <p className="descriptionLabel">Description:</p>
                    <p className="description">{item.description}</p>
                </div>
                <div className="PriceAndButtons">
                    <p className="price">$ {item.price}</p>
                    <p className="addToCartButton">Add to Cart</p>
                </div>

            </div>
    </div>
  )
}

export default Itempage
