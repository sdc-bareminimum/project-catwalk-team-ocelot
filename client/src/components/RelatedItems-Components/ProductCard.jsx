import React from 'react';
import { Card } from 'react-bootstrap';
import CompareModal from './CompareModal.jsx';

const ProductCard = ({ product }) => (
  <Card
    key={product.id}
    style={{
      width: '14rem', marginRight: '20px', border: 'solid', borderWidth: 'thin', position: 'realtive',
    }}
  >
    <CompareModal
      product={product}
      sytle={{
        position: 'absolute', right: '10px', top: '10px', zindex: 1,
      }}
    />
    <Card.Img variant="top" src={product.photo} style={{ height: '225px' }} />
    <Card.Body style={{ padding: '4px' }}>
      <Card.Title style={{ fontSize: '13px', padding: '4px' }}>{product.category}</Card.Title>
      <Card.Title style={{ fontSize: '15px', padding: '4px' }}>{product.name}</Card.Title>
      <Card.Text style={{ fontSize: '10px', padding: '4px' }}>
        $
        {product.default_price}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default ProductCard;
