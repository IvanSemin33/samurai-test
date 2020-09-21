import moment from 'moment'
import _ from 'lodash'

/**
 * Patient data parser for request or store
 * @param {object} params
 * @param {object} params.data
 * @param {string} params.type
 */
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

export const parseSearchValue = (value) => value?.replaceAll(' ', '+')

export const parseOrderBy = (orderBy) => {
  const getOrder = (order) => (order === 'desc' ? '-' : '')

  const orderByArray = _.keys(orderBy).map((id) => {
    if (orderBy[id]) {
      const order = getOrder(orderBy[id])
      switch (id) {
        case 'id':
          return `${order}_id`
        case 'given_name':
          return `${order}.name.0.given.0`
        case 'family_name':
          return `${order}.name.0.family`
        case 'birth_date':
          return `${order}.birthDate`
        case 'gender':
          return `${order}.gender`
        case 'address':
          return `${order}.address.0.line.0`
        case 'last_updated':
          return `${order}_lastUpdated`
        case 'created_at': {
          return `${order}_createdAt`
        }
        default:
          return ''
      }
    } else {
      return ''
    }
  })
  return _.compact(orderByArray).join(',')
}
