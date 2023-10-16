// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import accountsTableData from "layouts/accounts/data/accountsTableData";
import { useState } from "react";

function Accounts() {
  const defaultValue = 50;
  const [page, setPage] = useState({ take: defaultValue, skip: 0 });
  const [pageSetting, setPageSetting] = useState({ pageIndex: 0, pageSize: defaultValue });
  const { columns, rows, total } = accountsTableData(page);
  const pageChangeHandler = (pageDetail) => {
    const { pageIndex, pageSize } = pageDetail;
    setPageSetting(pageDetail);
    const skip = pageIndex === 0 ? 0 : pageIndex * pageSize;
    setPage({ take: pageSize, skip });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Accounts
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  entriesPerPage={{ defaultValue, entries: [20, 25, 50, 100] }}
                  totalEntries={total}
                  isSorted={false}
                  showTotalEntries
                  noEndBorder
                  onPageChange={pageChangeHandler}
                  pageSettings={pageSetting}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Accounts;
