<template>
  <div>
    <Header />
    <PopularProducts />
    <Placeholder />
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/home/Header.vue'
import PopularProducts from '@/components/home/PopularProducts.vue'
import Placeholder from '@/components/home/Placeholder.vue'
import Footer from '@/components/home/Footer.vue'

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
            this.updateInventory();
        }, 100)
    },
    methods: {
        updateInventory() {
            console.log("Test");
            localStorage.clear();

            // update-Books

            this.$store.commit("cart/initCart");
            this.$store.commit('products/init_store')
        }
    }
}
</script>