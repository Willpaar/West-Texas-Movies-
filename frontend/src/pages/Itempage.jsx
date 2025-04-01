import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
const Itempage = () => {
    const id = useParams();
    const location = useLocation();
    const item = location.state?.item;
  return (
    <div>
      <p className="">{item.name}</p>
      <p className="">{item.description}</p>
      <p className="">{item.storage}</p>


    </div>
  )
}

export default Itempage
