import api from './index';

export const voteAPI = {
  // POST /api/vote/cast
  castVote(candidateId) {
    return api.post('/vote/cast', { candidateId });
  },

  // GET /api/vote/my-votes
  getMyVote() {
    return api.get('/vote/my-votes');
  },

  // DELETE /api/vote/remove
  removeVote() {
    return api.delete('/vote/remove');
  }
};
