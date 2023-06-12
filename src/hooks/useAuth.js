import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isUser = false;
  let isAdmin = false;
  let status = "User";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;

    isUser = roles.includes("User");
    isAdmin = roles.includes("Admin");

    if (isUser) status = "User";
    if (isAdmin) status = "Admin";

    return { username, roles, status, isUser, isAdmin };
  }

  return { username: "", roles: [], isUser, isAdmin, status };
};
export default useAuth;
