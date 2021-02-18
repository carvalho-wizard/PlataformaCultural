const actions = {
  setNextRoute({ commit }, { route }) {
    commit('SET_NEXT_ROUTE', { route });
  },
  initStore({ dispatch }) {
    dispatch('categories/loadCategories');
    dispatch('pins/loadPins');
    dispatch('services/verifyToken')
      .then((response) => dispatch('users/loadCurrentUser', { id: response.id }));
    // try {
    //   dispatch('topics/loadTopics');
    //   return dispatch('users/loadCurrentUser', { id: getters['services/decodeToken'].id });
    // } catch (error) {
    //   console.log('errrro');
    //   return error;
    // }
  },
};

export default actions;
