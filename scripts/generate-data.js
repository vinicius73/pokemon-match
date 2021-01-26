const path = require('path')
const fs = require('fs').promises
const axios = require('axios')
const pSeries = require('p-series')
const pMemoize = require('p-memoize')

const { map, reduce, uniq, filter, some } = require('lodash')

const blockList = [
  '-gmax',
  '-galar',
  '-cap',
  '-alola',
  '-mega',
  '-mega-x',
  '-mega-y',
  '-cosplay',
  '-libre',
  '-pop-star',
  '-belle',
  '-primal',
  '-large',
  '-therian',
  '-small'
]

const specials = ['pikachu-original-cap']

const BASE_URL = 'https://pokeapi.co/api/v2'
const TARGET = path.resolve(__dirname, '../src/data/raw')

axios.defaults.baseURL = BASE_URL

const isValidPokemon = name => {
  return !some(blockList, word => name.endsWith(word))
}

const loadGenerations = () => {
  return axios.get('/generation')
    .then(({ data }) => data.results)
    .then(results => map(results, ({ name }, index) => ({
      name,
      id: index + 1
    })))
}

const load = (generationId) => {
  return axios.get(`/generation/${generationId}/`)
    .then(({ data }) => data.pokemon_species)
    .then(result => map(result, 'name'))
    .then(names => filter(names, isValidPokemon))
    .then(names => [...names, ...specials])
}

const loadDetails = pMemoize(name => {
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
    .catch(err => {
      console.log(`[${name}] ${err.message}`)
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
  // const types = extractCollection(data, 'types')
  // const abilities = extractCollection(data, 'abilities')

  return {
    // types,
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

  return load(generation.id)
    .then(result => {
      console.log('Loading pokémon data')
      return Promise.all(map(result, loadDetails))
    })
    .then(result => filter(result, Boolean))
    .then(result => extractData(result))
    .then(result => {
      console.log('Storing data')
      return Promise.all(
        map(
          Object.entries(result),
          ([key, value]) => {
            return storeFile(`${generation.name}-${key}`, value)
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
    console.error(err)
  })
  .then(() => {
    console.groupEnd('ganerate')
    console.timeEnd('ganerate:data')
  })
