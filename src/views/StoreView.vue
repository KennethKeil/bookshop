<template>
  <v-container>
    <v-row>
      <v-col offset-lg="1" sm="3">
        <v-text-field v-model="search" label="Suche" @input="filterProducts"/>
      </v-col>
      <v-col lg="7" sm="9">
        <div>
          <h2>Alle Bücher</h2>
          <!-- list of product cards that wraps -->
          <v-row>
          <v-col
              v-for="product in filteredProducts"
              :key="product.id"
              md="6"
              sm="12"
          >
              <ProductCard :product="product"/>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import {mapState, mapActions} from 'vuex'
import ProductCard from '@/components/cards/ProductCard.vue'

export default {
  components: {
    ProductCard,
  },

  data() {
    return {
      search: '',
      loading: false,
      productIndex: 1
    }
  },

  computed: {
    ...mapState({
      products: state => state.products.items
    }),
    filteredProducts() {
      return this.products.filter(product => {
        return product.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },


  methods: {
    ...mapActions({
      fetchProducts: 'products/fetchProducts',
    }),
    filterProducts() {
      this.fetchProducts(this.search)
    }
  },

}
</script>

<style scoped>
h2 {
  margin-top: 24px;
  margin-bottom: 16px;
}
</style>