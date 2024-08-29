import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useEffect } from "react";
import { TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import useStockRequest from "../services/useStockRequest";

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

export default function BrandModal({
  open,
  setOpen,
  brand,
  firms,
  categories,
  mode,
  setMode,
}) {
  const { postDatas, getDatas, editDatas } = useStockRequest();
  const [brandInfo, setBrandInfo] = useState({
    name: "",
    image: "",
    firmIds: [],
    categories: [],
  });

  console.log(brand);
  useEffect(() => {
    if (mode === "edit" && brand) {
      setBrandInfo({
        name: brand.name || "",
        image: brand.image || "",
        firmIds: brand.firmIds.map(firm=> firm._id) || [],
        categories: brand.categories.map(category => category._id) || "",
      });
    } else {
      setBrandInfo({
        name: "",
        image: "",
        firmIds: [],
        categories: [],
      });
    }
  }, [brand, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrandInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleFirmChange = (e) => {
    const { value } = e.target;
    setBrandInfo(prevInfo => ({
      ...prevInfo,
      firmIds: typeof value === 'string' ? value.split(',') : value,
    }));
  };
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setBrandInfo(prevInfo => ({
      ...prevInfo,
      categories: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
    setMode("new");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "edit") {
      editDatas("brands", brandInfo, brand._id).then(() => getDatas("brands"));
    } else {
      postDatas("brands", brandInfo).then(() => getDatas("brands"));
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
          <TextField
            required
            label="Brand Name"
            name="name"
            id="brandName"
            type="text"
            variant="outlined"
            value={brandInfo.name}
            onChange={handleChange}
          />
          <TextField
            required
            type="url"
            label="Image"
            name="image"
            id="image"
            variant="outlined"
            value={brandInfo.image}
            onChange={handleChange}
          />
          <FormControl fullWidth>
          <InputLabel id="firm-select-label">Firms</InputLabel>
          <Select
            name="firmIds"
            labelId="firm-select-label"
            id="firm-select"
            multiple
            value={brandInfo.firmIds}
            label= "Firm"
            onChange={handleFirmChange}
            renderValue={(selected) =>
              selected?.map(id => {
                  const firm = firms.find(firm => firm._id === id);
                  return firm ? firm.name : "";
                })
                .join(", ")
            }
          >
            {firms?.map(firm => (
              <MenuItem key={firm._id} value={firm._id}>
                {firm.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            name="categoryId"
            labelId="category-select-label"
            id="category-select"
            multiple
            value={brandInfo.categories}
            label="Category"
            onChange={handleCategoryChange}
            renderValue={(selected) =>
              selected?.map(id => {
                  const category = categories.find(category => category._id === id);
                  return category ? category.name : "";
                })
                .join(", ")
            }
          >
            {categories?.map(category => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
          <Button onClick={handleSubmit} variant="contained">
            {mode === "edit" ? "Update Brand" : "Add Brand"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
