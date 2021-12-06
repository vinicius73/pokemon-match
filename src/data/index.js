import { map, flatten, uniqBy } from 'lodash-es'
import { onIdle } from '@/plugins/on-idle'

const GENERATIONS = Object.freeze(
  ['i', 'ii', 'iii', 'iv', 'v', 'vi']
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

const loadAllPokemonList = () => onIdle(() => {
  const promises = map(GENERATIONS, gen => loadPokemonList(gen))

  return Promise.all(promises)
    .then(lists => flatten(lists))
    .then(list => uniqBy(list, ({ name }) => name))
})

export {
  GENERATIONS,
  loadAllPokemonList,
  loadPokemonList
}
