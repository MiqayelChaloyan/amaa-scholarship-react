/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
import { useQuery } from "react-query";
import { useMemo, useEffect, useState } from "react";
import getDevices from "hooks/api/KVGet";
import useKVAuth from "hooks/useKVAuth";

export default function devicesData({ take, skip }) {
  const { getAccessTokenSilently } = useKVAuth();
  const [token, setToken] = useState("");
  let rows = [
    {
      uuid: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Loading ...
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
    ["devices", { token, take, skip, endpoint: "devices" }],
    getDevices
  );
  useMemo(() => {
    if (!isLoading && !isError && data && data.devices && data.devices.length) {
      rows = data.devices.map((row) => ({
        id: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {row.id}
          </MDTypography>
        ),
        deviceName: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {row.deviceName}
          </MDTypography>
        ),
        deviceSerial: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {row.deviceSerial}
          </MDTypography>
        ),
        manufacturingDate: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {row.manufacturingDate}
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
      { Header: "Device ID", accessor: "id", align: "left" },
      { Header: "Device Name", accessor: "deviceName", align: "left" },
      { Header: "Serial", accessor: "deviceSerial", align: "left" },
      { Header: "Manufacturing Date", accessor: "manufacturingDate", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows,
    total,
  };
}
