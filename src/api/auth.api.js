import api from './index';

export const authAPI = {
  // POST /api/auth/register
  register(data) {
    return api.post('/auth/register', {
      nationalId: data.nationalId,
      password: data.password,
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      constituencyId: data.constituencyId
    });
  },

  // POST /api/auth/login
  login(nationalId, password) {
    return api.post('/auth/login', { nationalId, password });
  },

  // POST /api/auth/admin/register
  adminRegister(username, password) {
    return api.post('/auth/admin/register', { username, password });
  },

  // POST /api/auth/admin/login
  adminLogin(username, password) {
    return api.post('/auth/admin/login', { username, password });
  }
};
