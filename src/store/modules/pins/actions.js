import api from '../../../apiClient';

const token = localStorage.getItem('access_token');

const actions = {
  loadPins({ commit, dispatch }) {
    dispatch('services/GET', { uri: 'pins' }, { root: true })
      .then((response) => {
        commit('SET_PINS_LIST', { pins: response.data });
      })
      .catch((error) => console.log(error));
  },
  loadMarkes({ commit }) {
    Promise((resolve, reject) => {
      api.get('/loadMarkes', {
        params: {
          // type,
          // pagination,
        },
        headers: {
          Autrhorization: `token ${token}`,
        },
      })
        .then((response) => {
          console.log('pins/loadMarkers');
          commit('SET_PINS_LIST', response.data);
          resolve(response);
        })
        .catch((error) => {
          console.log(error.message);
          reject(error);
        });
    });
  },

  loadPinById({ commit }, { pinId }) {
    Promise((resolve, reject) => {
      api.get('/getPinById', {
        params: {
          pinId,
        },
        headers: {
          Autrhorization: `token ${token}`,
        },
      })
        .then((response) => {
          console.log('pins/loadMarkers');
          commit('SET_PINS_LIST', response.data);
          resolve(response);
        })
        .catch((error) => {
          console.log(error.message);
          reject(error);
        });
    });
  },
};

export default actions;