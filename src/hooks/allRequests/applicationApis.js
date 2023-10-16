/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import getDataByParam from "../api/getDataByParam";
import postData from "../api/postData";
import changeDataByParam from "../api/changeDataByParam";

let user = {};
function getUser() {
  const userString = localStorage.getItem("currentUser");
  user = JSON.parse(userString);
}

export async function getUserAllApplications() {
  getUser();
  let result = await getDataByParam({
    path: "/scholarshipBackend/all-applications",
    param: user._id,
    accessToken: user.accessToken,
  });
  if (!result?.message?.error) {
    return result;
  }
  if (result?.tokenChanged) {
    result = await getDataByParam({
      path: "/scholarshipBackend/all-applications",
      param: user._id,
      accessToken: user.accessToken,
    });
    return result;
  }
  return false;
}

export async function createApplication() {
  getUser();
  let result = await postData({
    path: "/scholarshipBackend/applications",
    body: { user_id: user._id },
    accessToken: user.accessToken,
  });
  if (!result?.message?.error) {
    return result;
  }
  if (result?.tokenChanged) {
    result = await postData({
      path: "/scholarshipBackend/applications",
      body: { user_id: user._id },
      accessToken: user.accessToken,
    });
    return result;
  }
  return false;
}
export async function changeApplication(data) {
  getUser();
  let result = await changeDataByParam({
    body: data.body, // application data
    path: "/scholarshipBackend/applications",
    param: data.appId, // application id,
    accessToken: user.accessToken,
  });
  if (!result?.message?.error) {
    return result;
  }
  if (result?.tokenChanged) {
    result = await changeDataByParam({
      body: data.body, // application data
      path: "/scholarshipBackend/applications",
      param: data.appId, // application id,
      accessToken: user.accessToken,
    });
    return result;
  }
  return false;
}

export async function getApplicationById(data) {
  getUser();
  let result = await getDataByParam({
    path: "/scholarshipBackend/applications",
    param: data.appId,
    accessToken: user.accessToken,
  });
  if (!result?.message?.error) {
    return result;
  }
  if (result?.tokenChanged) {
    result = await getDataByParam({
      path: "/scholarshipBackend/applications",
      param: data.appId,
      accessToken: user.accessToken,
    });
    return result;
  }
  return false;
}
