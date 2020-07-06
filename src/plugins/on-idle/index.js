import { serialOnIdle, onIdle } from './promise'

const install = (Vue) => {
  Object.defineProperty(Vue.prototype, '$onIdle', {
    value: serialOnIdle
  })
}

export { install, onIdle }
export default { install }
