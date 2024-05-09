import { DataGrid } from '@mui/x-data-grid';
import useStockRequest from '../services/useStockRequest';
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { Button } from '@mui/material';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import ProductModal from '../components/ProductModal';
import { useState } from 'react';

const Products = () => {
  const { getDatas, deleteDatas } = useStockRequest();
  const { products, categories, brands } = useSelector((state) => state.getData);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mode, setMode] = useState("new");
  useEffect(() => {
    getDatas("products")
    getDatas("brands")
    getDatas("categories")
  }, [])

  const handleEdit = (row) => {
    const product = row.product
    setSelectedProduct(product);
    setOpen(true);
    setMode("edit")
  };

  const handleDelete = (id) => {
    deleteDatas("products", id).then(() => {
      getDatas("products");
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'brand', headerName: 'Brand', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'stock', headerName: 'Stock', flex: 1 },
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


  const rows = products.map((product) => ({
    id: product._id, 
    category: product.categoryId.name,
    brand: product.brandId.name,
    name: product.name,
    stock: product.quantity,
    product: product
  }));

  return (
    <>
    <h2>Products</h2>
    <Button onClick={() => {
        setOpen(true)
        setMode("new")
        }} sx={{mb:"10px"}} variant="contained">New Product</Button>
        <ProductModal categories={categories} brands={brands} mode={mode} setMode={setMode} open={open} setOpen={setOpen} product={selectedProduct}/>
    <div style={{width: '100%', height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
        autoHeight
        
      />
    </div>
    </>
    
  );
}

export default Products;