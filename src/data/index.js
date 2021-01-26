import { map } from 'lodash-es'

const GENERATIONS = Object.freeze(
  ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'vii']
)

function freeze (list) {
  return Object.freeze(
    map(list, row => Object.freeze(row))
  )
}

const loadPokemonList = (generation = GENERATIONS[0]) => {
  return import(
  /* webpackChunkName: "pokemon-data" */
  /* webpackMode: "lazy" */
    `./raw/generation-${generation}-pokemon.json`
  )
    .then(result => freeze(result.default))
}

export {
  GENERATIONS,
  loadPokemonList
}
