/* eslint-disable import/prefer-default-export */
export async function refreshAccessToken(data) {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URI}/users/refresh-access-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data.body),
  });
  const result = await response.json();
  return result;
}
