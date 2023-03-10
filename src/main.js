import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import router from './router'


Vue.config.productionTip = false


new Vue({
    vuetify,
    router,
    store: store,
    beforeCreate() {
        this.$store.commit('products/initStore')
        this.$store.commit('cart/initCart')
    },
    render: h => h(App)
}).$mount('#app')


    