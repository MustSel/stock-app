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
import FirmModal from "../components/FirmModal";

const Firms = () => {
  const { getDatas, deleteDatas } = useStockRequest();
  const { firms } = useSelector((state) => state.getData);
  const [open, setOpen] = useState(false);
  const [selectedFirm, setSelectedFirm] = useState(null);
  const [mode, setMode] = useState("new");
  console.log(firms);

  const handleEdit = (firm) => {
    setSelectedFirm(firm);
    setOpen(true);
    setMode("edit")
  };

  useEffect(() => {
    getDatas("firms");
  }, []);

  return (
    <>
      <h2>Firms</h2>
      <Button onClick={() => {
        setOpen(true)
        setMode("new")
        }} sx={{ mb: "10px" }} variant="contained">
        New Firm
      </Button>
      <FirmModal mode={mode} setMode={setMode} open={open} setOpen={setOpen} firm={selectedFirm} />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {firms?.map((item) => (
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
                <CardMedia
                  component="img"
                  alt={item.name}
                  height="140"
                  image={item.image}
                  sx={{
                    objectFit: "contain",
                    mt: "15px",
                  }}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Tooltip title={item.address} arrow>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {item.address}
                    </Typography>
                  </Tooltip>
                </CardContent>
                <CardActions sx={{ flexGrow: 1, margin: "auto" }}>
                  <Button
                    onClick={() => {
                      deleteDatas("firms", item._id).then(() =>
                        getDatas("firms")
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

export default Firms;
