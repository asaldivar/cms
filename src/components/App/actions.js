import mockData from './mock-data.json'

import camelcaseKeys from 'camelcase-keys'

const addPages = payload => ({
  type: 'ADD_PAGES',
  payload,
})

export const fetchPages = () => async dispatch => {
  // const response = await fetch('http://localhost:5000/pages')
  // let { pages } = await response.json()
  const { versions } = mockData
  const versionData = camelcaseKeys(versions, { deep: true })
  const versionOptions = versions.map(({ name }) => name)

  return dispatch(addPages({ versions: versionOptions, versionData }))
}
