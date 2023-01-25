<template>
  <v-card outlined class="px-3" style="background-color: #f8f9fa; box-shadow: 0px 0px 5px 0px #ccc">
    <v-img class="mx-auto my-5 ma-10" :src="getImgUrl(product.image)" v-bind:alt="product.image" contain max-width="200px"/>
    <v-card-title class="word-break">{{ product.title }}</v-card-title>
    <v-card-subtitle>Preis: {{ product.price }}€</v-card-subtitle>
    <v-card-text>{{ product.description }}</v-card-text>
    <v-card-text>Verfügbar: {{ product.inventory }}</v-card-text>
    <v-card-actions>
      <v-btn 
        :disabled="!productIsInStock(product)"
        @click="addProductToCart(product)" 
        color="success" outlined
        style="width: 130px"
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

    data () {
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
        return require('../../assets/images/'+url)
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