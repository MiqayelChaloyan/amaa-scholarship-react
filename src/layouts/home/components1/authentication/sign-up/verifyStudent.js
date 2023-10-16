import { verifyStudent } from "hooks/allRequests/userApis";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyStudent() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(async () => {
    const param = location.search.substring(1).split("=");
    const result = await verifyStudent({ verification: param[1] });
    if (result.email) {
      localStorage.setItem("currentUser", JSON.stringify(result));
      navigate("/personalInformation");
    }
  }, []);
  return <>ok</>;
}
export default VerifyStudent;
