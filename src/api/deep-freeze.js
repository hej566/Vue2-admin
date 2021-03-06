/**
 * Deep freeze an object. Based on `substack/deep-freeze`.
 * @param obj {Object}
 * @link https://github.com/substack/deep-freeze
 * @returns {Object}
 */
export default function deepFreeze(obj) {
  Object.freeze(obj);
  const isFunction = typeof obj === 'function';
  Object.getOwnPropertyNames(obj).forEach(prop => {
    if (
      (isFunction
        ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments'
        : true) &&
      obj[prop] !== null &&
      (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') &&
      !Object.isFrozen(obj[prop])
    ) {
      deepFreeze(obj[prop]);
    }
  });

  return obj;
}
