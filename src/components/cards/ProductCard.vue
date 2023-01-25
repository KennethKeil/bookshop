<template>
  <v-card class="px-3" outlined style="background-color: #f8f9fa; box-shadow: 0px 0px 5px 0px #ccc">
    <v-img :src="getImgUrl(product.image)" class="mx-auto my-5 ma-10" contain max-width="200px"
           v-bind:alt="product.image"/>
    <v-card-title class="word-break">{{ product.title }}</v-card-title>
    <v-card-subtitle>Preis: {{ product.price }}€</v-card-subtitle>
    <v-card-text>{{ product.description }}</v-card-text>
    <v-card-text>Verfügbar: {{ product.inventory }}</v-card-text>
    <v-card-actions>
      <v-btn
          :disabled="!productIsInStock(product)"
          color="success"
          outlined style="width: 130px"
          @click="addProductToCart(product)"
      >
        hinzufügen
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  props: {
    product: Object,
  },

  data() {
    return {
      loading: false,
      productIndex: 1,
    }
  },

  computed: {
    ...mapState({
      products: state => state.products.items
    }),

    ...mapGetters('products', {
      productIsInStock: 'productIsInStock'
    })
  },

  methods: {
    ...mapActions({
      fetchProducts: 'products/fetchProducts',
      addProductToCart: 'cart/addProductToCart'
    }),
    getImgUrl(url) {
      return require('../../assets/images/' + url)
    }
  },


}
</script>

<style scoped>
.px-3 {
  padding: 3px;
}

.word-break {
  word-break: break-all;
}
</style>