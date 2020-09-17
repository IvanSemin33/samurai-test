import moment from "moment";

export const parsePatientData = ({
  given_name = "",
  family_name = "",
  birth_date = "",
  gender = "",
  address = "",
}) => {
  return {
    name: [{ given: [given_name], family: family_name }],
    gender,
    address: [{ line: [address] }],
    birthDate: moment(birth_date).format("YYYY-MM-DD"),
  };
};

export const parseSearchValue = (value) => value.replaceAll(" ", "+");
