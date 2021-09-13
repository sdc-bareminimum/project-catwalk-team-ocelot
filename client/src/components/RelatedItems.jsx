import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RelatedItems({ productId, setProductId }) {
  const [relatedList, setRelatedList] = useState([]);

  const getRelatedItems = (id) => {
    axios.get(`/api/products/${id}/related`)
      .then(({ data }) => {
        setRelatedList(data);
      });
  };

  useEffect(() => {
    getRelatedItems(productId);
  }, []);

  return <div>RelatedItems</div>;
}

export default RelatedItems;
