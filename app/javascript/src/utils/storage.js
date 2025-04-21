const setToLocalStorage = ({
  authToken,
  email,
  userId,
  userName,
  organizationId,
}) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("authEmail", JSON.stringify(email));
  localStorage.setItem("authUserId", JSON.stringify(userId));
  localStorage.setItem("authUserName", JSON.stringify(userName));
  localStorage.setItem(
    "authUserOrganizationId",
    JSON.stringify(organizationId)
  );
};

const getFromLocalStorage = key => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export { setToLocalStorage, getFromLocalStorage };
