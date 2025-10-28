// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as authServiceLogin } from "../services/apis/authService";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { authConstants } from "../constants/authConstants"; // Import authConstants
import { authMessages } from "../messages/authMessages"; // Import authMessages

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const handleUnauthorizedLogout = (
  navigate,
  setUser,
  setIsAuthenticated
) => {
  Swal.fire({
    title: authConstants.SESSION_EXPIRED_TITLE,
    text: authConstants.SESSION_EXPIRED_TEXT,
    icon: authConstants.ICON_WARNING,
    confirmButtonText: authConstants.CONFIRM_BUTTON_TEXT_OK,
  }).then(() => {
    localStorage.removeItem(authConstants.TOKEN_KEY);
    localStorage.removeItem(authConstants.USER_KEY);
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login page
  });
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fungsi untuk mengecek apakah token sudah expired
  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(authConstants.TOKEN_KEY);
    const storedUser = localStorage.getItem(authConstants.USER_KEY);

    if (token && storedUser) {
      if (isTokenExpired(token)) {
        localStorage.removeItem(authConstants.TOKEN_KEY);
        localStorage.removeItem(authConstants.USER_KEY);
        setIsAuthenticated(false);
        setUser(null);
      } else {
        setIsAuthenticated(true);
        setUser(JSON.parse(storedUser));
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }, []);

  // Fungsi login
  const login = async (username, password) => {
    try {
      const response = await authServiceLogin(username, password);
      if (response) {
        const {
          message,
          token,
          username: responseUsername,
          role,
          id_admin,
          id_account,
          id_company,
        } = response;

        localStorage.setItem(authConstants.TOKEN_KEY, token);
        localStorage.setItem(
          authConstants.USER_KEY,
          JSON.stringify({
            username: responseUsername,
            role,
            id_admin,
            id_account,
            id_company,
          })
        );
        setIsAuthenticated(true);
        setUser({
          username: responseUsername,
          role,
          id_admin,
          id_account,
          id_company,
        });

        Swal.fire({
          title: authConstants.LOGIN_SUCCESS_TITLE,
          text: message || authMessages.LOGIN_SUCCESS_DEFAULT_MESSAGE,
          icon: authConstants.ICON_SUCCESS,
          confirmButtonText: authConstants.CONFIRM_BUTTON_TEXT_SUCCESS,
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          title: authConstants.LOGIN_FAILED_TITLE,
          text: authMessages.LOGIN_FAILED_DEFAULT_MESSAGE,
          icon: authConstants.ICON_ERROR,
          confirmButtonText: authConstants.CONFIRM_BUTTON_TEXT_ERROR,
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || authMessages.ERROR_DEFAULT_MESSAGE;
      Swal.fire({
        title: authConstants.ERROR_TITLE,
        text: errorMessage,
        icon: authConstants.ICON_ERROR,
        confirmButtonText: authConstants.CONFIRM_BUTTON_TEXT_ERROR,
      });
    }
  };

  // Fungsi logout
  const logout = () => {
    Swal.fire({
      title: authConstants.LOGOUT_CONFIRMATION_TITLE,
      text: authConstants.LOGOUT_CONFIRMATION_TEXT,
      icon: authConstants.ICON_WARNING,
      showCancelButton: true,
      confirmButtonColor: authConstants.LOGOUT_CONFIRM_BUTTON_COLOR,
      cancelButtonColor: authConstants.LOGOUT_CANCEL_BUTTON_COLOR,
      confirmButtonText: authConstants.LOGOUT_CONFIRM_BUTTON_TEXT,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(authConstants.TOKEN_KEY);
        localStorage.removeItem(authConstants.USER_KEY);
        setIsAuthenticated(false);
        setUser(null);
        Swal.fire({
          title: authConstants.LOGOUT_SUCCESS_TITLE,
          text: authConstants.LOGOUT_SUCCESS_TEXT,
          icon: authConstants.ICON_SUCCESS,
          confirmButtonText: authConstants.CONFIRM_BUTTON_TEXT_SUCCESS,
        }).then(() => {
          navigate("/login");
        });
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        handleUnauthorizedLogout: () =>
          handleUnauthorizedLogout(navigate, setUser, setIsAuthenticated),
      }}
    >
      {!loading && children}{" "}
      {/* Tampilkan children hanya jika loading selesai */}
    </AuthContext.Provider>
  );
};
