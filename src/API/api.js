import axios from 'axios'

const base = 'https://samuraitest.aidbox.app'

/**
 * Get patient/patients
 * @param {object} params
 * @param {string} params.token
 * @param {string} params.id
 */
export const get_patient = ({ token, id }) => {
  const patientIdPath = id ? `/${id}` : ''
  return axios.get(`${base}/Patient${patientIdPath}`, {
    headers: {
      'Content-Type': 'application/yaml',
      Authorization: `Bearer ${token}`,
    },
  })
}

/**
 * Get access token
 * @param {object} params
 * @param {string} params.client_id
 * @param {object} params.client_secret
 */
export const post_auth_token = ({ client_id, client_secret }) => {
  return axios.post(`${base}/auth/token`, {
    client_id,
    client_secret,
    grant_type: 'client_credentials',
  })
}

/**
 * Create patient
 * @param {object} params
 * @param {string} params.token
 * @param {object} params.data
 */
export const post_patient = ({ token, data }) => {
  return axios.post(
    `${base}/Patient`,
    { ...data },
    {
      headers: {
        'Content-Type': ['application/yaml', 'text/plain'],
        Authorization: `Bearer ${token}`,
      },
    },
  )
}

/**
 * Search patients
 * @param {object} params
 * @param {string} params.token
 * @param {string} params.q
 */
export const get_patient_$lookup = ({ token, q }) => {
  return axios.get(`${base}/Patient/$lookup`, {
    headers: {
      'Content-Type': 'application/yaml',
      Authorization: `Bearer ${token}`,
    },
    params: {
      by: 'name.family,name.given,birthDate,gender,identifier.value;address.line',
      q,
      count: 50,
      limit: 200,
    },
  })
}

/**
 * Delete patient
 * @param {object} params
 * @param {string} params.token
 * @param {string} params.id
 */
export const delete_patient = ({ token, id }) => {
  return axios.delete(`${base}/Patient/${id}`, {
    headers: {
      'Content-Type': 'application/yaml',
      Authorization: `Bearer ${token}`,
    },
  })
}

/**
 * Update patient
 * @param {object} params
 * @param {string} params.token
 * @param {object} params.data
 * @param {string} params.id
 */
export const put_patient = ({ token, data, id }) => {
  return axios.put(
    `${base}/Patient/${id}`,
    { ...data },
    {
      headers: {
        'Content-Type': ['application/yaml', 'text/plain'],
        Authorization: `Bearer ${token}`,
      },
    },
  )
}

/**
 * Close Session
 * @param {object} params
 * @param {string} params.token
 */
export const delete_session = ({ token }) => {
  return axios.delete(`${base}/Session`, {
    headers: {
      'Content-Type': 'application/yaml',
      Authorization: `Bearer ${token}`,
    },
  })
}
