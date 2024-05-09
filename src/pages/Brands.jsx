import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import { Button, Grid, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BrandModal from "../components/BrandModal";

const Brands = () => {
  const { getDatas, deleteDatas } = useStockRequest();
  const { brands } = useSelector((state) => state.getData);
  const [open, setOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [mode, setMode] = useState("new");
  console.log(brands);

  const handleEdit = (brand) => {
    setSelectedBrand(brand);
    setOpen(true);
    setMode("edit")
  };

  useEffect(() => {
    getDatas("brands");
  }, []);

  return (
    <>
      <h2>Brands</h2>
      <Button onClick={() => {
        setOpen(true)
        setMode("new")
        }} sx={{ mb: "10px" }} variant="contained">
        New Brand
      </Button>
        <BrandModal mode={mode} setMode={setMode} open={open} setOpen={setOpen} brand={selectedBrand} />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {brands?.map((item) => (
            <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  bgcolor: "lightgrey",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
                  transition: "box-shadow 0.3s, transform 0.3s",
                  ":hover": { boxShadow: 10, transform: "scale(1.01)" },
                }}
              >
                <CardContent sx={{ flexGrow: 1, margin: "auto" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  alt={item.name}
                  height="140"
                  image={item.image}
                  sx={{
                    objectFit: "contain",
                  }}
                />
                <CardActions sx={{ flexGrow: 1, margin: "auto" }}>
                  <Button
                    onClick={() => {
                      deleteDatas("brands", item._id).then(() =>
                        getDatas("brands")
                      );
                    }}
                    size="small"
                  >
                    <DeleteOutlineIcon />
                  </Button>
                  <Button onClick={()=>handleEdit(item)} size="small">
                    <EditIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Brands;
