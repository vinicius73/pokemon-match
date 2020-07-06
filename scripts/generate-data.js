const path = require('path')
const fs = require('fs').promises
const axios = require('axios')
const { map, reduce, uniq } = require('lodash')

const BASE_URL = 'https://pokeapi.co/api/v2'
const TARGET = path.resolve(__dirname, '../src/data/raw')

const load = () => {
  return axios.get(`${BASE_URL}/pokemon?limit=150`)
    .then(({ data }) => data.results)
    .then(result => map(result, 'name'))
}

const loadDetails = name => {
  return axios.get(`${BASE_URL}/pokemon/${name}`)
    .then(({ data }) => data)
    .then(({ id, name, types, abilities }) => {
      return {
        id,
        name,
        abilities: map(abilities, 'ability.name'),
        types: map(types, 'type.name')
      }
    })
}

const extractCollection = (data, field) => {
  const collection = reduce(data, (acc, row) => {
    return [
      ...acc, ...row[field]
    ]
  }, [])

  return uniq(collection)
}

const extractData = data => {
  const types = extractCollection(data, 'types')
  const abilities = extractCollection(data, 'abilities')

  return {
    types,
    abilities,
    pokemon: data
  }
}

const storeFile = (name, content) => {
  const fileName = path.join(TARGET, `/${name}.json`)
  return fs.writeFile(fileName, JSON.stringify(content))
}

console.time('ganerate:data')
console.group('ganerate')
console.log('Loading pokémon list')

load()
  .then(result => {
    console.log('Loading pokémon data')
    return Promise.all(map(result, loadDetails))
  })
  .then(result => extractData(result))
  .then(result => {
    console.log('Storing data')
    return Promise.all(
      map(
        Object.entries(result),
        ([key, value]) => {
          return storeFile(key, value)
        }
      )
    )
  })
  .catch(err => {
    console.error(err)
  })
  .then(() => {
    console.groupEnd('ganerate')
    console.timeEnd('ganerate:data')
  })
