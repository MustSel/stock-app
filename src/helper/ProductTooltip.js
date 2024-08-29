import React from 'react';
import { Tooltip } from '@mui/material';

const ProductTooltip = ({ title, imageUrl }) => (
  <Tooltip
    title={
      <div className="text-center p-2 bg-white shadow-lg rounded-lg border border-gray-300 flex flex-col items-center">
        <img
          src={imageUrl}
          alt={title}
          className="w-36 h-auto mb-2" 
        />
        <span className="text-sm text-gray-700">{title}</span> 
      </div>
    }
    placement="top"
    arrow
  >
    <span className="text-blue-500 hover:underline">{title}</span> 
  </Tooltip>
);

export default ProductTooltip;
