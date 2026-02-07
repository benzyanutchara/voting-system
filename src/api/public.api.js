import api from './index';

export const publicAPI = {
  // GET /api/public/constituencies
  getConstituencies() {
    return api.get('/public/constituencies');
  },

  // GET /api/public/constituencies/:id/results
  getConstituencyResults(id) {
    return api.get(`/public/constituencies/${id}/results`);
  },

  // GET /api/public/parties
  getParties() {
    return api.get('/public/parties');
  },

  // GET /api/public/parties/:id
  getPartyDetails(id) {
    return api.get(`/public/parties/${id}`);
  },

  // GET /api/public/party-overview
  getPartyOverview() {
    return api.get('/public/party-overview');
  }
};
