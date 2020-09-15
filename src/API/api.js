import axios from "axios";

const base = "http://samuraitest.aidbox.app";

export const getPatient = ({ username, password }) => {
  return axios.get(
    `${base}/Patient`,
    {
      headers: {
        "Content-Type": "application/yaml",
        Authorization: "Basic YmFzaWM6c2VjcmV0",
      },
    },
    {
      auth: {
        username,
        password,
      },
    }
  );
};
