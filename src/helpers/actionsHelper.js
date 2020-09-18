import moment from 'moment'

export const parsePatientData = ({
  data: {
    given_name = '',
    family_name = '',
    birth_date = '',
    gender = '',
    address = '',
    name = [],
    birthDate = '',
  },
  type,
}) => {
  console.log(given_name, family_name, birth_date, gender, address, name, birthDate, type)

  if (type === 'request') {
    return {
      name: [{ given: [given_name], family: family_name }],
      gender,
      address: [{ line: [address] }],
      birthDate: moment(birth_date).format('YYYY-MM-DD'),
    }
  }
  if (type === 'store') {
    return {
      given_name: name[0]?.given[0],
      family_name: name[0]?.family,
      gender,
      address: address[0]?.line[0],
      birth_date: birthDate,
    }
  }
}

export const parseSearchValue = (value) => value.replaceAll(' ', '+')
