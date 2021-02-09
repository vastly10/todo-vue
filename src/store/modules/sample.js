const state = () => ({
    count: 0
});

const getters = {

};

const actions = {

};

const mutations = {
    increment (state) {
        state.count++;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
