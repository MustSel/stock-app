import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useStockRequest from '../services/useStockRequest';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaleModal from '../components/SaleModal';
import { useState } from 'react';

const Sales = () => {
  const { getDatas, deleteDatas } = useStockRequest();
  const { sales, brands, products } = useSelector((state) => state.getData);
  const [open, setOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [mode, setMode] = useState("new");
console.log(sales)
  React.useEffect(() => {
    getDatas("sales")
    getDatas("brands")
    getDatas("products")
  }, [])

  const handleEdit = (row) => {
    const sale = row.sale
    setSelectedSale(sale);
    setOpen(true);
    setMode("edit")
  };

  const handleDelete = (id) => {
    deleteDatas("sales", id).then(() => {
      getDatas("sales");
    });
  };

  const columns = [
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'brand', headerName: 'Brand', flex: 1 },
    { field: 'product', headerName: 'Product', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params.row)}><EditIcon/></button>
          <button onClick={() => handleDelete(params.row.id)}><DeleteOutlineIcon/></button>
        </div>
      ),
    },
  ];

  const rows = sales.map((sale) => ({
    id: sale._id,
    date: new Date(sale.createdAt).toLocaleString(),
    brand: sale.brandId.name,
    product: sale.productId.name,
    quantity: sale.quantity,
    price: sale.price,
    amount: sale.amount,
    sale: sale
  }));

  return (
    <>
    <h2>Sales</h2>
    <Button  onClick={() => {
        setOpen(true)
        setMode("new")
        }} sx={{mb:"10px"}} variant="contained">New Sale</Button>
    <SaleModal brands={brands} products={products} mode={mode} setMode={setMode} open={open} setOpen={setOpen} sale={selectedSale}/>
    <div style={{ width: '100%', height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        // checkboxSelection
        autoHeight
        
      />
    </div>
    </>
    
  );
}

export default Sales;
