import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card, Container, Row, Col,
} from 'react-bootstrap';
import Carousel from './RelatedItems-Components/Carousel.jsx';

function RelatedItems({ productId, setProductId }) {
  const [relatedListData, setRelatedListData] = useState([]);
  const [relatedStyleData, setRelatedStyleData] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [listLength, setListLength] = useState(0);

  const getItemData = (relatedId) => (axios.get(`/api/products/${relatedId}`)
    .then(({ data }) => (data)))
    .catch((err) => (console.log(err)));

  const getStyleData = (relatedId) => (axios.get(`/api/products/${relatedId}/styles`)
    .then(({ data }) => (data.results[0].photos[0].thumbnail_url)))
    .catch((err) => (console.log(err)));

  const getAllData = (idList) => {
    const dataPromises = idList.map((item) => (getItemData(item)));
    const stylePromises = idList.map((item) => (getStyleData(item)));
    (Promise.all(dataPromises))
      .then((results) => {
        setRelatedListData(results);
      });
    (Promise.all(stylePromises))
      .then((results) => {
        setRelatedStyleData(results);
      });
  };

  const zipData = () => {
    const data = relatedListData.map((item, i) => {
      item.photo = relatedStyleData[i];
      return item;
    });
    setMergedData(data);
  };

  const getRelatedItems = (id) => {
    axios.get(`/api/products/${id}/related`)
      .then(({ data }) => {
        getAllData(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRelatedItems(productId);
  }, []);

  useEffect(() => {
    zipData();
  }, [relatedStyleData]);

  useEffect(() => {
    setListLength(mergedData.length);
  }, mergedData);

  return (
    <div style={{
      maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64,
    }}
    >
      <Carousel show={3}>
        {mergedData.map((product) => (
          <Card style={{ width: '12rem', margin: '10px', border: 'solid', borderWidth: 'thin' }}>
            <Card.Img variant="top" src={product.photo} style={{ height: '250px' }} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </Carousel>
    </div>
  );
}
export default RelatedItems;
