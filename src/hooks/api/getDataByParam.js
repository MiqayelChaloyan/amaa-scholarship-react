import { refreshToken } from "../allRequests/refreshTokenOrLogOut";

async function getDataByParam(data) {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URI}${data.path}/${data.param}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: data.accessToken ? `Bearer ${data.accessToken}` : "",
    },
  });
  const result = await response.json();
  if (result?.message?.error === "Unauthorized") {
    await refreshToken();
    result.tokenChanged = true;
    return result;
  }
  return result;
}

export default getDataByParam;
