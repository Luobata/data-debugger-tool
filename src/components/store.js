import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        data: [],
        chooseData: {},
    },
    mutations: {
        changeData(state, data) {
            state.data = data;
        },
        chooseData(state, data) {
            state.chooseData = data;
        },
    },
});

export default store;
