import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// sections
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
} from "../sections/@dashboard/app";
import { TotalCreditAmount, TotalDebitAmount, TotalExcessAmount, TotalShortAmount, complianceAmount, otherDebitAmount, verifyToken } from "../utils/ApiRoutes";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [username, setUsername] = useState(null)
  const [CreditAmount, setTotalCreditAmount] = useState(null)
  const [DebitAmount, setTotalDebitAmount] = useState(null)
  const [ExcessAmount, setTotalExcessAmount] = useState(null)
  const [ShortAmount, setTotalShortAmount] = useState(null)
  const [compliance, setCompliance] = useState(null)
  const [otherDebit, setOtherDebit] = useState(null)

  const navigate = useNavigate();

useEffect(()=>{
  const getData = async () => {
    const TotalCreditData = await axios.get(TotalCreditAmount)
    const TotalDebitData = await axios.get(TotalDebitAmount)
    const TotalExcessData = await axios.get(TotalExcessAmount)
    const TotalShortData = await axios.get(TotalShortAmount)
    const complianceData = await axios.get(complianceAmount)
    const otherDebitAmountData = await axios.get(otherDebitAmount)
    setTotalCreditAmount(TotalCreditData?.data.AmountCreditedTotal)
    setTotalDebitAmount(TotalDebitData?.data.AmountDebitTotal)
    setTotalExcessAmount(TotalExcessData?.data.AmountExcessTotal)
    setTotalShortAmount(TotalShortData?.data.AmountShortTotal)  
    setCompliance(complianceData?.data.TotalCompliance)
    setOtherDebit(otherDebitAmountData?.data.otherDebit)
  }
  getData()
},[])


  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token")
      const {data}  = await axios.post(verifyToken,{
        token
      });
      setUsername(data.username)
      console.log(data.username)
      if(data.status==="false"){
        navigate("/login");
      }
    }
    checkUser()

  }, [navigate]);
  
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {`Hi, Welcome back ${username}`}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Credited Amount"
              total={CreditAmount}
              icon={"ant-design:android-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Debit Amount"
              total={DebitAmount}
              color="info"
              icon={"ant-design:apple-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
            // Total NetDifference In +ve
            title="Total Excess Amount"
            total={ExcessAmount}
            color="warning"
            icon={"ant-design:windows-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
            // Total NetDifference In -ve
              title="Total Short Amount"
              total={ShortAmount}
              color="error"
              icon={"ant-design:bug-filled"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                "01/01/2022",
                "02/01/2022",
                "03/01/2022",
                "04/01/2022",
                "05/01/2022",
                "06/01/2022",
                "07/01/2022",
                "08/01/2022",
                "09/01/2022",
                "10/01/2022",
                "11/01/2022",
              ]}
              chartData={[
                {
                  name: "Sales",
                  type: "column",
                  fill: "solid",
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: "Short",
                  type: "area",
                  fill: "gradient",
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: "Excess",
                  type: "line",
                  fill: {
                    colors: ['#ff4843']
                  },
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                // Total Credit  
                { label: "Credit", value: parseInt(CreditAmount,10) },
                // Total Compliance Paid EPF + ESIC till now
                { label: "Compliance", value: parseInt(compliance,10) },
                // Total Other Debit
                { label: "Other Debit", value: parseInt(otherDebit,10) },
                // Total Debit
                { label: "Total Debit", value: parseInt(DebitAmount,10) },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
