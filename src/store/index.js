import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'
import cart from './modules/cart'
import products from './modules/products'
import order from "@/store/modules/order";

Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        cart,
        products,
        order
    },

    state: { // = data
        cart: [],
        order: []
    },

    getters: { // = computed properties

    },

    actions,

    mutations: {}
})









