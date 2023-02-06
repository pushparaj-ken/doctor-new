import AuthContext from "app/context/AuthContext";
import useProvideAuth from "app/hooks/useProvideAuth";

function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
