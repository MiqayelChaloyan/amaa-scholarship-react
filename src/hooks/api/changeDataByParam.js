import { refreshToken } from "../allRequests/refreshTokenOrLogOut";

async function changeDataByParam(data) {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URI}${data.path}/${data.param}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.accessToken}`,
    },
    body: JSON.stringify(data.body),
  });
  const result = await response.json();
  if (result?.message?.error === "Unauthorized") {
    await refreshToken();
    result.tokenChanged = true;
    return result;
  }
  return result;
}

export default changeDataByParam;
