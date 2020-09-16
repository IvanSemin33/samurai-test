import axios from "axios";

const base = "http://samuraitest.aidbox.app";

export const get_patient = ({ token }) => {
  return axios.get(`${base}/Patient`, {
    headers: {
      "Content-Type": "application/yaml",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const post_auth_token = ({ client_id, client_secret }) => {
  return axios.post(`${base}/auth/token`, {
    client_id,
    client_secret,
    grant_type: "client_credentials",
  });
};
