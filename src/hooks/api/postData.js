import { refreshToken } from "../allRequests/refreshTokenOrLogOut";

async function postData(data) {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URI}${data.path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: data.accessToken ? `Bearer ${data.accessToken}` : "",
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

export default postData;
