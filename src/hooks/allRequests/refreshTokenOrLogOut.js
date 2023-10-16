/* eslint-disable import/prefer-default-export */
import { refreshAccessToken } from "./refreshAccessTokenApi";

export async function refreshToken() {
  const userString = localStorage.getItem("currentUser");
  let user = JSON.parse(userString);
  const newAccessToken = await refreshAccessToken({
    accessToken: user.accessToken,
    body: { refreshToken: user.refreshToken },
  });

  if (!newAccessToken?.message?.error) {
    user = { ...user, accessToken: newAccessToken.accessToken };
    localStorage.setItem("currentUser", JSON.stringify(user));
  }
  if (newAccessToken?.message?.error === "Unauthorized") {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("applicationId");
    localStorage.removeItem("activeStep");
    window.location.replace("/");
  }
}
