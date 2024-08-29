
import { Container, Paper, Grid, Typography } from "@mui/material";
import { AreaChart } from "@tremor/react";
import { useSelector } from "react-redux";

const dataFormatter = (number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

const Charts = () => {
  const { sales, purchases } = useSelector((state) => state.getData);

  const salesData = sales?.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString("tr-TR"),
    amount: item.amount,
  }));

  const purchasesData = purchases?.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString("tr-TR"),
    amount: item.amount,
  }));
  console.log(salesData);
  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" alignItems="center" marginTop={3}>
        <Grid item xs={12} lg={6}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              p: 2,
            }}
          >
            Total Sales ($)
            <AreaChart
              className="h-80"
              data={salesData}
              index="date"
              categories={["amount"]}
              colors={["orange"]}
              valueFormatter={dataFormatter}
              yAxisWidth={60}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              p: 2,
            }}
          >
            Total Purchases ($)
            <AreaChart
              className="h-80"
              data={purchasesData}
              index="date"
              categories={["amount"]}
              colors={["purple"]}
              valueFormatter={dataFormatter}
              yAxisWidth={60}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Charts;
