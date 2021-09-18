import RangeSlider from 'react-bootstrap-range-slider';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Characteristics = ({ size, comfort }) => (
  <div>
    <p className="size-label">Size</p>
    <RangeSlider className="characteristics" tooltip="off" value={size} min={0} max={10} size="lg" width="50%" />
    <div className="characteristics-label">
      <span>Too Small</span>
      <span>Perfect</span>
      <span>Too Large</span>
    </div>
    <p className="comfort-label">Comfort</p>
    <RangeSlider className="characteristics" tooltip="off" value={comfort} min={0} max={10} size="lg" width="50%" />
    <div className="characteristics-label">
      <span>Poor</span>
      <span>Perfect</span>
    </div>
  </div>

);

export default Characteristics;
