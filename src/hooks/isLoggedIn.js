function getUser() {
  const saved = localStorage.getItem("currentUser");
  return saved !== null ? JSON.parse(saved) : false;
}

export default getUser;
