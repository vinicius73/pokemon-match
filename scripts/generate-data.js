const path = require('path')
const fs = require('fs').promises
const axios = require('axios')
const pSeries = require('p-series')
const pMemoize = require('p-memoize')

const { map, reduce, uniq, filter } = require('lodash')

const LANGUAGES = Object.freeze(['en'])

const BASE_URL = 'https://pokeapi.co/api/v2'
const TARGET = path.resolve(__dirname, '../src/data/raw')
const TARGET_TYPES = ['pokemon']

axios.defaults.baseURL = BASE_URL
axios.defaults.timeout = 6000

const extractNames = names => {
  return reduce(names, (acc, row) => {
    const key = row.language.name
    if (LANGUAGES.includes(key)) {
      acc[key] = row.name
    }

    return acc
  }, {})
}

const loadGenerations = () => {
  return axios.get('/generation')
    .then(({ data }) => data.results)
    .then(results => map(results, ({ name }, index) => ({
      name,
      id: index + 1
    })))
}

const loadSpecies = (generationId) => {
  return axios.get(`/generation/${generationId}/`)
    .then(({ data }) => data.pokemon_species)
}

const loadExtra = pMemoize(name => {
  return axios.get(`/pokemon/${name}`)
    .then(({ data }) => data)
    .then(({ types, abilities }) => ({
      types: map(types, 'type.name')
      // abilities: map(abilities, 'ability.name')
    }))
    .catch(err => {
      return Promise.reject(new Error(`[loadExtra] ${err.message}`))
    })
})

const loadDetails = pMemoize(param => {
  const [url, name] = param.split('#')

  return axios.get(url)
    .then(({ data }) => data)
    .then(async ({ id, name, names }) => {
      const extra = await loadExtra(name)

      return {
        id,
        name,
        names: extractNames(names),
        ...extra
      }
    })
    .catch(err => {
      console.error(`[err][${name}]${err.message}`)
      return false
    })
})

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
  // const abilities = extractCollection(data, 'abilities')

  return {
    types,
    // abilities,
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

const generateData = generation => {
  console.group(generation.name)

  return loadSpecies(generation.id)
    .then(result => {
      console.log('Loading pokémon data')
      return Promise.all(
        map(result, (data) => loadDetails(`${data.url}#${data.name}`))
      )
    })
    .then(result => filter(result, Boolean))
    .then(result => extractData(result))
    .then(result => {
      console.log('Storing data')
      return Promise.all(
        map(
          TARGET_TYPES,
          (key) => {
            return storeFile(`${generation.name}-${key}`, result[key])
          }
        )
      )
    })
    .catch(err => {
      console.log(err.message)
    })
    .then(() => {
      console.groupEnd(generation.name)
    })
}

loadGenerations()
  .then(generations => {
    return map(generations, (generation) => {
      return () => generateData(generation)
    })
  })
  .then(list => pSeries(list))
  .catch(err => {
    console.error(`[err] ${err.message}`)
  })
  .then(() => {
    console.groupEnd('ganerate')
    console.timeEnd('ganerate:data')
  })
