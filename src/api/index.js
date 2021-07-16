import createApiHandler from './create-api-handler';
import createApiInstance from './create-api-instance';

const API_CONFIG = {
  requestTimeout: 8000,
  apiEndpoints: '/api/'
};

export default function API() {
  const apiHandler = createApiHandler(API_CONFIG);
  return createApiInstance(apiHandler);
}
