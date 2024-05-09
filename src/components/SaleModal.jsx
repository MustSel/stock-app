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

export default function SaleModal({
  open,
  setOpen,
  sale,
  mode,
  setMode,
  brands,
  products,
}) {

    const navigate = useNavigate()  
  const { postDatas, getDatas, editDatas } = useStockRequest();
  const [saleInfo, setSaleInfo] = useState({
    brandId: "",
    productId: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    if (mode === "edit") {
      setSaleInfo({
        brandId: sale.brandId._id || "",
        productId: sale.productId._id || "",
        quantity: sale.quantity || "",
        price: sale.price || "",
      });
    } else {
      setSaleInfo({
        brandId: "",
        productId: "",
        quantity: "",
        price: "",
      });
    }
  }, [sale, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSaleInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  console.log(saleInfo);
  const handleClose = () => {
    setOpen(false);
    setMode("new");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "edit") {
      editDatas("sales", saleInfo, sale._id).then(() => getDatas("sales"));
    } else {
      postDatas("sales", saleInfo).then(() => getDatas("sales"));
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
              <InputLabel id="demo-simple-select-label">Brands</InputLabel>
              <Select
                name="brandId"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={saleInfo.brandId}
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
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Products</InputLabel>
              <Select
                name="productId"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={saleInfo.productId}
                label="Product"
                onChange={handleChange}
              >
                <MenuItem sx={{borderBottom:"1px solid grey"}} onClick={()=> navigate("/stock/products")}>Add New Product</MenuItem>
                {products?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TextField
            required
            label="Quantity"
            name="quantity"
            id="quantity"
            type="text"
            variant="outlined"
            value={saleInfo.quantity}
            onChange={handleChange}
          />
          <TextField
            required
            label="Price"
            name="price"
            id="price"
            type="url"
            variant="outlined"
            value={saleInfo.price}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit} variant="contained">
            {mode === "edit" ? "Update Sale" : "Add Sale"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
