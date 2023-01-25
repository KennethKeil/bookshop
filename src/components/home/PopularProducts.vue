<template>
  <v-container class="fill-height mb-12">
    <v-row>
      <v-col lg="8" offset-lg="2" offset-sm="1" sm="10">
        <h2>Empfohlene Bücher
          <v-btn color="primary" small text to="store">Zeige alle an</v-btn>
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="8" offset-lg="2" offset-sm="1" sm="10">
        <v-row>
          <v-col
              v-for="product in products.slice(0, 3)"
              :key="product.id"
              md="4"
              sm="6"
          >
            <ProductCard :product="product"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import ProductCard from '@/components/cards/ProductCard.vue'

export default {
  components: {
    ProductCard
  },

  data() {
    return {
      loading: false,
      productIndex: 1
    }
  },

  computed: {
    ...mapState({
      products: state => state.products.items
    }),
  },


  methods: {
    ...mapActions({
      fetchProducts: 'products/fetchProducts',
    })
  },


}
</script>

<style scoped>

</style>