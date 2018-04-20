import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        data: [],
    },
    mutations: {
        changeData(state, data) {
            state.data = data;
        },
    },
});

export default store;
