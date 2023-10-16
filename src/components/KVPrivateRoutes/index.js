import { Navigate, Outlet } from "react-router-dom";
import useKVAuth from "hooks/useKVAuth";

function KVPrivateRoutes() {
  const { isCTAdmin, isLoading } = useKVAuth();
  return !isLoading && isCTAdmin ? <Outlet /> : <Navigate to="/authentication/sign-in" />;
}
export default KVPrivateRoutes;
