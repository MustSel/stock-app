import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useStockRequest from '../services/useStockRequest';
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { Button } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from 'react';
import PurchaseModal from '../components/PurchaseModal';

const Purchases = () => {
  const { getDatas, deleteDatas } = useStockRequest();
  const { purchases, brands, products, firms } = useSelector((state) => state.getData);
  console.log(purchases)
  const [open, setOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [mode, setMode] = useState("new");
  const columns = [
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'firm', headerName: 'Firm', flex: 1 },
    { field: 'brand', headerName: 'Brand', flex: 1 },
    { field: 'product', headerName: 'Product', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params.row)}><EditIcon/></button>
          <button onClick={() => handleDelete(params.row.id)}><DeleteOutlineIcon/></button>
        </div>
      ),
    },
  ];
  
  const rows = purchases.map((purchase) => ({
    id: purchase._id,
    date: new Date(purchase.createdAt).toLocaleString(),
    firm: purchase.firmId ? purchase.firmId.name : 'N/A',
    brand: purchase.brandId.name,
    product: purchase.productId.name,
    quantity: purchase.quantity,
    price: purchase.price,
    amount: purchase.amount,
    purchase: purchase
  }));
  

  const handleEdit = (row) => {
    const purchase = row.purchase
    setSelectedPurchase(purchase);
    setOpen(true);
    setMode("edit")
  };

  const handleDelete = (id) => {
    deleteDatas("purchases", id).then(() => {
      getDatas("purchases");
    });
  };

  useEffect(() => {
    getDatas("purchases")
    getDatas("brands")
    getDatas("products")
    getDatas("firms")
  
  }, [])
  return (
    <>
    <h2>Purchases</h2>
    <Button onClick={() => {
        setOpen(true)
        setMode("new")
        }} sx={{mb:"10px"}} variant="contained">New Purchase</Button>
        <PurchaseModal firms={firms} brands={brands} products={products} mode={mode} setMode={setMode} open={open} setOpen={setOpen} purchase={selectedPurchase}/>
  <div style={{ height: 400, width: '100%' }}>
  <DataGrid
    rows={rows}
    columns={columns}
    autoHeight
    pageSizeOptions={[5, 10, 20, 50, 100]}
    
  />
</div>
</>
)
}

export default Purchases
