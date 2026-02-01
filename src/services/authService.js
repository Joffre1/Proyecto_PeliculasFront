import axios from "axios";

const API_URL = "http://127.0.0.1:8000/o/token/";

export const login = async (username, password) => {

  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("client_id", "19gnNg4dB1PPkXPBtfEi8dTzS97R7YSabeo3FjtM");
  params.append("username", username);
  params.append("password", password);

  const response = await axios.post(API_URL, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  return response.data;
};
