export const validation = ({ id, value }) => {
  switch (id) {
    case 'given_name':
      return /[\r\n\t\S]+/.test(value)
    case 'family_name':
      return /[ \r\n\t\S]+/.test(value)
    case 'birth_date':
      return /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?/.test(
        value,
      )
    case 'gender':
      return /[^\s]+(\s[^\s]+)*/.test(value)
    case 'address':
      return /[ \r\n\t\S]+/.test(value)
    default:
      return true
  }
}
