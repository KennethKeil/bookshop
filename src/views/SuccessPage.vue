<template>
  <div>
    <Header />
    <PopularProducts />
    <Placeholder />
    <Footer />
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios';
import Header from '@/components/home/Header.vue'
import PopularProducts from '@/components/home/PopularProducts.vue'
import Placeholder from '@/components/home/Placeholder.vue'
import Footer from '@/components/home/Footer.vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        Header,
        PopularProducts,
        Placeholder,
        Footer,
    },
    mounted() {
        setTimeout(() => { 
            alert("Zahlung erfolgreich!")
        }, 100)
        this.updateInventory();
    },

    computed: {
      ...mapGetters('cart', {
            products: 'cartProducts',
        }),
    },

    methods: {
        updateInventory() {

            this.products.forEach(product => {
                console.log(product.id);
            });

            localStorage.clear();

            /*
            // update-Books
            const requests = this.products.map(product => {
                axios.put(`https://ivm108.informatik.htw-dresden.de/ewa/g17/php-backend/update.php`, product)
            });
            Promise.all(requests).then(() => {
                console.log("Update erfolgreich")
            });
            */

            this.$store.commit("cart/initCart");
            this.$store.commit('products/init_store')

        }
    }
}
</script>