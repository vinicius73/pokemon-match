import { onIdle } from './plugins/on-idle'
import './registerServiceWorker'
import '@/assets/main.scss'

onIdle(
  () => import(/* webpackChunkName: "bootstrap" */'./bootstrap')
)
