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

export default function FirmModal({ open, setOpen, firm, mode, setMode }) {
  const { postDatas, getDatas, editDatas } = useStockRequest();
  const [firmInfo, setFirmInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });
  

  useEffect(() => {
    if (mode === "edit") {
      setFirmInfo({
        name: firm.name || "",
        phone: firm.phone || "",
        address: firm.address || "",
        image: firm.image || "",
      });
      
    } else {
      setFirmInfo({
        name: "",
        phone: "",
        address: "",
        image: "",
      });
      
    }
  }, [firm, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFirmInfo((prevInfo) => ({
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
      editDatas("firms", firmInfo, firm._id).then(() => getDatas("firms"));
    } else {
      postDatas("firms", firmInfo).then(() => getDatas("firms"));
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
            label="Firm Name"
            name="name"
            id="firmName"
            type="text"
            variant="outlined"
            value={firmInfo.name}
            onChange={handleChange}
          />
          <TextField
            required
            label="Phone"
            name="phone"
            id="phone"
            type="text"
            variant="outlined"
            value={firmInfo.phone}
            onChange={handleChange}
          />
          <TextField
            required
            label="Address"
            name="address"
            id="address"
            type="text"
            variant="outlined"
            value={firmInfo.address}
            onChange={handleChange}
          />
          <TextField
            required 
            type="url"
            label="Image"
            name="image"
            id="image"
            
            variant="outlined"
            value={firmInfo.image}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit} variant="contained">
            {mode === "edit" ? "Update Firm" : "Add Firm"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
