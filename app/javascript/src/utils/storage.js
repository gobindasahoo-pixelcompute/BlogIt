const setToLocalStorage = ({
  authToken,
  email,
  userId,
  userName,
  organizationId,
}) => {
  localStorage.setItem("authToken", authToken);
  localStorage.setItem("authEmail", email);
  localStorage.setItem("authUserId", userId);
  localStorage.setItem("authUserName", userName);
  localStorage.setItem("authUserOrganizationId", organizationId);
};

const getFromLocalStorage = key => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const resetLocalStorage = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authEmail");
  localStorage.removeItem("authUserId");
  localStorage.removeItem("authUserName");
  localStorage.removeItem("authUserOrganizationId");
};

export { setToLocalStorage, getFromLocalStorage, resetLocalStorage };
