import Resources from './resources';
// import GeoAdcode from './resources/geoAdcode';

/**
 * Create an API instance using the provided API handler.
 * @param apiHandler {Object}
 * @returns {Object}
 */
export default function createApiInstance(apiHandler) {
  return {
    account: Resources.AccountResource(apiHandler)
  };
}
