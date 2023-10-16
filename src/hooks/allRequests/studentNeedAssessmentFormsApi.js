/* eslint-disable no-underscore-dangle */
import changeDataByParam from "hooks/api/changeDataByParam";
import getDataByParam from "hooks/api/getDataByParam";
import postData from "hooks/api/postData";

/* eslint-disable import/prefer-default-export */
let user = {};
function getUser() {
  const userString = localStorage.getItem("currentUser");
  user = JSON.parse(userString);
}
export async function createForm(data) {
  getUser();
  let result = await postData({
    path: "/student-need-assessment",
    body: data,
    accessToken: user.accessToken,
  });
  if (!result?.message?.error) {
    return result;
  }
  if (result?.tokenChanged) {
    result = await postData({
      path: "/student-need-assessment",
      body: data,
      accessToken: user.accessToken,
    });
    return result;
  }
  return false;
}

export async function getFormById(data) {
  getUser();
  let result = await getDataByParam({
    path: "/student-need-assessment/getForm",
    param: data.formId,
    accessToken: user.accessToken,
  });
  if (!result?.message?.error) {
    return result;
  }
  if (result?.tokenChanged) {
    result = await getDataByParam({
      path: "/student-need-assessment/getForm",
      param: data.formId,
      accessToken: user.accessToken,
    });
    return result;
  }
  return false;
}

export async function changeFormById(data) {
  getUser();
  let result = await changeDataByParam({
    body: data.body,
    path: "/student-need-assessment",
    param: data.appId,
    accessToken: user.accessToken,
  });
  if (!result?.message?.error) {
    return result;
  }
  if (result?.tokenChanged) {
    result = await changeDataByParam({
      body: data.body,
      path: "/student-need-assessment",
      param: data.appId,
      accessToken: user.accessToken,
    });
    return result;
  }
  return false;
}
