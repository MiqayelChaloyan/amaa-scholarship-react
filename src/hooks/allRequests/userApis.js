/* eslint-disable no-underscore-dangle */
/* eslint-disable no-else-return */
import postData from "hooks/api/postData";

/* eslint-disable import/prefer-default-export */

export async function logIn(data) {
  const userData = await postData({
    path: "/users/login",
    body: data,
  });
  if (!userData?.message?.error) {
    if (userData?.roles.includes("student")) {
      localStorage.setItem("currentUser", JSON.stringify(userData));
      return userData;
    } else {
      return { statusCode: "404", error: "Not Fount", message: "this user isn't student" };
    }
  } else {
    return userData?.message;
  }
}

export async function register(data) {
  const userData = await postData({
    path: "/users/student-user",
    body: data, // {"name": "Poxos","email": "ppoxosyan@amaa.am","password": "password" }
  });
  if (!userData?.message?.error) {
    return userData;
  } else {
    return userData?.message;
  }
}

export async function logOut() {
  const userString = localStorage.getItem("currentUser");
  const user = JSON.parse(userString);
  let userLogOut = await postData({
    path: "/users/log-out",
    body: { id: user._id },
  });
  if (!userLogOut?.message?.error) {
    return userLogOut;
  }
  if (userLogOut?.tokenChanged) {
    userLogOut = await postData({
      path: "/users/log-out",
      body: { id: user._id },
    });
    return userLogOut;
  }
  return false;
}

export async function forgotPassword(data) {
  const result = await postData({
    path: "/users/forgot-password",
    body: data, // {"email": "ppoxosyan@amaa.am" }
  });
  if (!result?.message?.error) {
    return result;
  } else {
    return result?.message;
  }
}

export async function verifyStudent(data) {
  const result = await postData({
    path: "/users/verify-email",
    body: data,
  });
  if (!result?.message?.error) {
    return result;
  } else {
    return result;
  }
}

export async function forgotPasswordVerify(data) {
  const result = await postData({
    path: "/users/forgot-password-verify",
    body: data,
  });
  if (!result?.message?.error) {
    return result;
  } else {
    return result?.message;
  }
}

export async function resetPassword(data) {
  const result = await postData({
    path: "/users/reset-password",
    body: data,
  });
  if (!result?.message?.error) {
    return result;
  } else {
    return result?.message;
  }
}
