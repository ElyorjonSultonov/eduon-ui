import axios from "axios";

export const refresh = (code, statusText) => {
  try {
    if (code == 401 || statusText === "Unauthorized") {
      axios
        .post(`${process.env.REACT_APP_API_KEY}/api/v1/token/refresh/`, {
          refresh: localStorage.getItem("refresh"),
        })
        .then((res) => {
          localStorage.setItem("access", res.data.access);
        })
        .catch((err) => {
          localStorage.removeItem("access");
        });
    }
  } catch (error) {}
};
