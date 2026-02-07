import api from './index';

export const adminAPI = {
  // GET /api/admin/users?search=xxx
  searchUsers(searchTerm) {
    return api.get('/admin/users', { params: { search: searchTerm } });
  },

  // POST /api/admin/promote
  promoteToEC(nationalId) {
    return api.post('/admin/promote', { nationalId });
  },

  // POST /api/admin/constituencies
  createConstituency(province, districtNumber) {
    return api.post('/admin/constituencies', { province, districtNumber });
  },

  // GET /api/admin/constituencies
  listConstituencies() {
    return api.get('/admin/constituencies');
  }
};
