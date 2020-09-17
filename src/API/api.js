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

export const post_patient = ({ token, data }) => {
  return axios.post(
    `${base}/Patient`,
    {
      ...data,
    },
    {
      headers: {
        "Content-Type": ["application/yaml", "text/plain"],
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const get_patient_$lookup = ({ token, q }) => {
  return axios.get(`${base}/Patient/$lookup`, {
    headers: {
      "Content-Type": "application/yaml",
      Authorization: `Bearer ${token}`,
    },
    params: {
      by: "name.family,name.given,birthDate,identifier.value;address.line",
      q,
      count: 50,
      limit: 200,
    },
  });
};
