/* eslint-disable @typescript-eslint/ban-types */
// @ts-nocheck
import { PromisePipeFactory } from './p-pipe'
import { isFunction, isArray } from 'lodash'
const w = window

/**
 * @type Function
 * @param {Function}
 * @returns {void}
 */
const subscribe = (() => {
  if (isFunction(w.requestIdleCallback)) {
    return w.requestIdleCallback.bind(w)
  }

  if (isFunction(w.requestAnimationFrame)) {
    return w.requestAnimationFrame.bind(w)
  }

  return function _setTimeout (fn) {
    return setTimeout(fn, 1)
  }
})()

/**
 * @param {Function} fn
 * @returns {Promise<any>}
 */
const onIdle = (fn: Function = undefined): Promise<unknown> => {
  return new Promise(resolve => {
    subscribe(() => {
      resolve(fn && fn())
    })
  })
}

class IdlePromise extends Promise {
  then (fn) {
    return super.then((...args) => {
      return onIdle(() => {
        return fn(...args)
      })
    })
  }
}

const pipeP = PromisePipeFactory(IdlePromise)
/**
 * @param  {Array<Function>} fns
 * @returns {Promise<Array<any>>}
 */
const serialOnIdle = async (...fns) => {
  if (isArray(fns[0])) {
    return serialOnIdle(...fns[0])
  }

  return pipeP(...fns)()
}

export { onIdle, subscribe, serialOnIdle, IdlePromise, pipeP }
