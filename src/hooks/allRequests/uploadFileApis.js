/* eslint-disable import/prefer-default-export */
import postData from "../api/postData";

let user = {};
function getUser() {
  const userString = localStorage.getItem("currentUser");
  user = JSON.parse(userString);
}

export async function getUploadUrl(data) {
  getUser();
  let result = await postData({
    path: "/scholarshipBackend/upload-url",
    body: data, // {fileName, containerNameEnd}
    accessToken: user.accessToken,
  });
  if (!result?.message?.error) {
    return result;
  }
  if (result?.tokenChanged) {
    result = postData({
      path: "/scholarshipBackend/upload-url",
      body: data, // {fileName, containerNameEnd}
      accessToken: data.accessToken,
    });
    return result;
  }
  return false;
}

export async function addDocumentToApplication(data) {
  getUser();
  let result = await postData({
    path: "/scholarshipBackend/add-document-to-application",
    body: data,
    accessToken: user.accessToken,
  });
  if (!result?.message?.error) {
    return result;
  }
  if (result?.tokenChanged) {
    result = postData({
      path: "/scholarshipBackend/add-document-to-application",
      body: data,
      accessToken: data.accessToken,
    });
    return result;
  }
  return false;
}

export async function getDownloadUrl(data) {
  getUser();
  let result = await postData({
    path: "/scholarshipBackend/download-url",
    body: data, // {blobName, containerNameEnd}
    accessToken: user.accessToken,
  });
  if (!result?.message?.error) {
    return result;
  }
  if (result?.tokenChanged) {
    result = postData({
      path: "/scholarshipBackend/download-url",
      body: data, // {blobName, containerNameEnd}
      accessToken: data.accessToken,
    });
    return result;
  }
  return false;
}
