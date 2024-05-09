import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
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

export default function BrandModal({ open, setOpen, brand, mode, setMode }) {
  const { postDatas, getDatas, editDatas } = useStockRequest();
  const [brandInfo, setBrandInfo] = useState({
    name: "",
    image: "",
  });
  

  useEffect(() => {
    if (mode === "edit") {
        setBrandInfo({
        name: brand.name || "",
        image: brand.image || "",
      });
      
    } else {
        setBrandInfo({
        name: "",
        image: "",
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

  const handleClose = () => {
    setOpen(false);
    setMode("new")
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
          
          <Button onClick={handleSubmit} variant="contained">
            {mode === "edit" ? "Update Brand" : "Add Brand"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
