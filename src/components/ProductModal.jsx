import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import useStockRequest from "../services/useStockRequest";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export default function ProductModal({
  open,
  setOpen,
  product,
  mode,
  setMode,
  brands,
  categories,
}) {

    const navigate = useNavigate()  
  const { postDatas, getDatas, editDatas } = useStockRequest();
  const [productInfo, setProductInfo] = useState({
    categoryId: "",
    brandId: "",
    name: "",
    
  });

  useEffect(() => {
    if (mode === "edit") {
        setProductInfo({
        categoryId: product.categoryId._id || "",
        brandId: product.brandId._id || "",
        name: product.name || "",
        
      });
    } else {
        setProductInfo({
            categoryId: "",
            brandId: "",
            name: "",
      });
    }
  }, [product, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  console.log(productInfo);
  const handleClose = () => {
    setOpen(false);
    setMode("new");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "edit") {
      editDatas("products", productInfo, product._id).then(() => getDatas("products"));
    } else {
      postDatas("products", productInfo).then(() => getDatas("products"));
    }
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                name="categoryId"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productInfo.categoryId}
                label="Category"
                onChange={handleChange}
              >
                
                {categories?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Brands</InputLabel>
              <Select
                name="brandId"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productInfo.brandId}
                label="Brand"
                onChange={handleChange}
              >
                <MenuItem sx={{borderBottom:"1px solid grey"}} onClick={()=> navigate("/stock/brands")}>Add New Brand</MenuItem>
                {brands?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <TextField
            required
            label="Product Name"
            name="name"
            id="name"
            type="text"
            variant="outlined"
            value={productInfo.name}
            onChange={handleChange}
          />
          
          <Button onClick={handleSubmit} variant="contained">
            {mode === "edit" ? "Update Product" : "Add Product"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
