import Paper from "@mui/material/Paper"
import Avatar from "@mui/material/Avatar"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import { purple, orange, green } from "@mui/material/colors"
import PaidIcon from "@mui/icons-material/Paid"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoneyIcon from '@mui/icons-material/Money';
import Typography from "@mui/material/Typography"
import { useSelector } from "react-redux"

const KPICards = () => {

  const { sales, purchases } = useSelector((state) => state.getData)
  const totalSales = sales?.reduce((acc, sale) => acc + sale.amount, 0)
  const totalPurchases = purchases?.reduce((acc, purchase) => acc + purchase.amount, 0)

  const kpiData = [
    {
      id: 1,
      title: "Sales",
      icon: <PaidIcon sx={{ fontSize: "1.8rem" }} />,
      amount: `$ ${totalSales.toLocaleString("tr-TR")}`,
      color: orange[700],
      bgColor: orange[100],
    },
    {
      id: 2,
      title: "Profit",
      icon: <MoneyIcon sx={{ fontSize: "1.8rem" }} />,
      amount: `$ ${(totalSales - totalPurchases).toLocaleString("tr-TR")}`,
      color: green[700],
      bgColor: green[100],
    },
    {
      id: 3,
      title: "Purchases",
      amount: `$ ${totalPurchases.toLocaleString("tr-TR")}`,
      icon: <ShoppingCartIcon sx={{ fontSize: "1.8rem" }} />,
      color: purple[700],
      bgColor: purple[100],
    },
  ]
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      flexWrap={"wrap"}
      direction={"row"}
      gap={2}
    >
      {kpiData.map((data) => (
        <Paper
          key={data.id}
          elevation={3}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            width: 275,
            p: 2,
            pl: 3,
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: data.bgColor,
              color: data.color,
              width: 60,
              height: 60,
            }}
          >
            {data.icon}
          </Avatar>
          <Box>
            <Typography variant="button">{data.title}</Typography>
            <Typography variant="h5">{data.amount}</Typography>
          </Box>
        </Paper>
      ))}
    </Stack>
  )
}

export default KPICards