import { useEffect, useState} from "react";
import useStockRequest from "../services/useStockRequest";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function ProductModal({
  open,
  setOpen,
  product,
  mode,
  firms,
  categories,
  setMode,
}) {

  const { getDatas, postDatas, editDatas } = useStockRequest();
  const [brands, setBrands] = useState([]);
  const [productInfo, setProductInfo] = useState({
    categoryId: "",
    brandId: "",
    name: "",
    firmIds: [],
  });

 

  useEffect(() => {
    if (open) {
      if (mode === "edit" && product) {
        setProductInfo({
          categoryId: product.categoryId._id || "",
          brandId: product.brandId._id || "",
          name: product.name || "",
          firmIds: product.firmIds.map(firm => firm._id) || [],
        });
        getDatas(`brands?filter[categories]=${product.categoryId._id}`)
          .then(response => setBrands(response?.data))
          .catch(error => console.error("Error fetching brands:", error));
      } else {
        setProductInfo({
          categoryId: "",
          brandId: "",
          name: "",
          firmIds: [],
        });
        setBrands([]); // Ürün seçilmediğinde markaları sıfırla
      }
    }
  }, [product, mode, open]);
  

  useEffect(() => {
    if (productInfo.categoryId) {
      getDatas(`brands?filter[categories]=${productInfo.categoryId}`)
        .then(response => {
          console.log(response?.data);
          setBrands(response?.data)
        })
        .catch(error => console.error("Error fetching brands:", error));
    }
    console.log(productInfo);
    console.log(brands);
    
  }, [productInfo.categoryId]); // Sadece categoryId değiştiğinde tetiklenir
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setProductInfo(prevInfo => ({
      ...prevInfo,
      categoryId: value,
      brandId: "",
    }));
    
  };

  const handleFirmChange = (e) => {
    const { value } = e.target;
    setProductInfo(prevInfo => ({
      ...prevInfo,
      firmIds: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
    setMode("new");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "edit") {
        await editDatas("products", productInfo, product._id);
      } else {
        await postDatas("products", productInfo);
      }
      getDatas("products"); // Ürün listesini güncelle
      handleClose(); // Formu kapat
    } catch (error) {
      console.error("Error submitting product:", error);
      // Hata mesajını kullanıcıya göster
    }
  };
  

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", border: "2px solid #000", boxShadow: 24, p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Categories</InputLabel>
            <Select
              name="categoryId"
              labelId="category-select-label"
              id="category-select"
              value={productInfo.categoryId}
              label="Category"
              onChange={handleCategoryChange}
            >
              {categories?.map(item => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="brand-select-label">Brands</InputLabel>
            <Select
              name="brandId"
              labelId="brand-select-label"
              id="brand-select"
              value={productInfo.brandId}
              label="Brand"
              onChange={handleChange}
            >
              {brands?.map(item => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <FormControl fullWidth>
            <InputLabel id="firm-select-label">Firms</InputLabel>
            <Select
              name="firmIds"
              labelId="firm-select-label"
              id="firm-select"
              multiple
              value={productInfo.firmIds}
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
          <Button onClick={handleSubmit} variant="contained">
            {mode === "edit" ? "Update Product" : "Add Product"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
