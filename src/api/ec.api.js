import api from './index';

export const ecAPI = {
  // POST /api/ec/parties (multipart/form-data)
  createParty(formData) {
    return api.post('/ec/parties', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  // POST /api/ec/candidates (multipart/form-data)
  createCandidate(formData) {
    return api.post('/ec/candidates', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  // PATCH /api/ec/constituencies/:id/close
  closeConstituency(id) {
    return api.patch(`/ec/constituencies/${id}/close`);
  },

  // PATCH /api/ec/constituencies/:id/open
  openConstituency(id) {
    return api.patch(`/ec/constituencies/${id}/open`);
  }
};
