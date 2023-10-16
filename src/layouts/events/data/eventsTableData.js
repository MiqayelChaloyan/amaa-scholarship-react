/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
import { useQuery } from "react-query";
import { useEffect, useMemo, useState } from "react";

import getEvents from "hooks/api/KVGet";
import useKVAuth from "hooks/useKVAuth";

export default function eventsData({ take, skip }) {
  const { getAccessTokenSilently } = useKVAuth();
  const [token, setToken] = useState("");
  let rows = [
    {
      id: (
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
    [`events`, { token, take, skip, endpoint: "events" }],
    getEvents
  );
  useMemo(() => {
    if (!isLoading && !isError && data && data.events.length) {
      rows = data.events.map((row) => ({
        id: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {row.id}
          </MDTypography>
        ),
        deviceId: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {row.deviceId}
          </MDTypography>
        ),
        eventData: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {JSON.stringify(row.eventData)}
          </MDTypography>
        ),
        eventSource: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {row.eventSource}
          </MDTypography>
        ),
        generatedOn: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {row.generatedOn}
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
      { Header: "event ID", accessor: "id", align: "left" },
      { Header: "Device ID", accessor: "deviceId", align: "left" },
      { Header: "Event Data", accessor: "eventData", align: "left" },
      { Header: "Event Source", accessor: "eventSource", align: "center" },
      { Header: "Event Date", accessor: "generatedOn", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows,
    total,
  };
}
