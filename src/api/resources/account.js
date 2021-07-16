function pickData(res) {
  return res.fields;
}
export default function Account(apiHandler) {
  return {
    login(data) {
      return apiHandler.post(`/login`, data).then(pickData);
    },
    logout() {
      return apiHandler.delete(`/login/quit`).then(pickData);
    },
    loginCallback(params) {
      return apiHandler.get(`/login/callback`, { params }).then(pickData);
    },
    getDefaultUser() {
      return apiHandler.get(`/user/byName`).then(pickData);
    }
  };
}
