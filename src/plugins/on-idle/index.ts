import { VueConstructor } from 'vue/types/umd'
import { serialOnIdle, onIdle } from './promise'

const install = (Vue: VueConstructor) => {
  Object.defineProperty(Vue.prototype, '$onIdle', {
    value: serialOnIdle
  })
}

export { install, onIdle }
export default { install }
