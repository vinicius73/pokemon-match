import { map } from 'lodash-es'

export type Pokemon = Readonly<{
  id: number;
  name: string;
  abilities: string[];
  types: string[];
}>

function freeze<T> (list: ReadonlyArray<T>) {
  return Object.freeze<T[]>(
    map(list, row => Object.freeze<T>(row))
  )
}

const loadPokemonList = (): Promise<ReadonlyArray<Pokemon>> => {
  return import(/* webpackChunkName: "data-pokemon" */'./raw/pokemon.json')
    .then(result => freeze<Pokemon>(result))
}

const loadAbilitiesList = (): Promise<ReadonlyArray<string>> => {
  return import(/* webpackChunkName: "data-abilities" */ './raw/abilities.json')
    .then(result => freeze<string>(result))
}

const loadTypesList = (): Promise<ReadonlyArray<string>> => {
  return import(/* webpackChunkName: "data-types" */ './raw/types.json')
    .then(result => freeze<string>(result))
}

export {
  loadPokemonList,
  loadAbilitiesList,
  loadTypesList
}
