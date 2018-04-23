import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        data: [
            {
                name: 'xxx',
                value: 123,
                obj: {
                    a: 2,
                    b: 3,
                },
            },
        ],
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
