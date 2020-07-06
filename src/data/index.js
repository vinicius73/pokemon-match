import { map } from 'lodash-es'

function freeze (list) {
  return Object.freeze(
    map(list, row => Object.freeze(row))
  )
}

const loadPokemonList = () => {
  return import(/* webpackChunkName: "data-pokemon" */'./raw/pokemon.json')
    .then(result => freeze(result.default))
}

const loadAbilitiesList = () => {
  return import(/* webpackChunkName: "data-abilities" */ './raw/abilities.json')
    .then(result => freeze(result.default))
}

const loadTypesList = () => {
  return import(/* webpackChunkName: "data-types" */ './raw/types.json')
    .then(result => freeze(result.default))
}

export {
  loadPokemonList,
  loadAbilitiesList,
  loadTypesList
}
