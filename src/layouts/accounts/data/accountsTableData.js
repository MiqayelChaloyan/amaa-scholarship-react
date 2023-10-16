/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useQuery } from "react-query";
import { useMemo, useEffect, useState } from "react";
import getUsers from "hooks/api/KVGet";
import useKVAuth from "hooks/useKVAuth";

export default function accountsData({ take, skip }) {
  const { getAccessTokenSilently } = useKVAuth();
  const [token, setToken] = useState("");
  const User = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );
  let rows = [
    {
      account: <User name="Loading ..." email="..." />,
      uuid: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Loading ...
        </MDTypography>
      ),
      authId: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Loading ...
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    },
  ];
  let total = 1;
  useEffect(async () => {
    const authToken = await getAccessTokenSilently();
    if (authToken) {
      setToken(authToken);
    }
  });
  const { isLoading, isError, data } = useQuery(
    ["users", { token, take, skip, endpoint: "users" }],
    getUsers
  );
  useMemo(() => {
    if (!isLoading && !isError && data && data.accounts.length) {
      rows = data.accounts.map((row) => ({
        account: <User name={`${row.firstName} ${row.lastName}`} email={row.email} />,
        uuid: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {row.userGuid}
          </MDTypography>
        ),
        authId: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {row.authId}
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      }));
      total = data.total;
    }
  }, [rows]);
  return {
    columns: [
      { Header: "account", accessor: "account", align: "left" },
      { Header: "UUID", accessor: "uuid", align: "left" },
      // { Header: "Auth0 ID", accessor: "authId", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows,
    total,
  };
}
