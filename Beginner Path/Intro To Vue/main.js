var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    brand: 'Vue Mastery',
    selectedVariant: 0,
    altText: 'A pair of socks',
    cart: 0,
    details: [
      "80% cotton",
      "20% polyester",
      "Gender-neutral"
    ],
    variants: [
      {
        variantId: 2234,
        variantColor: 'Green',
        variantImage: "./assets/vmSocks-green-onWhite.jpg",
        variantQuantity: 10
      },
      {
        variantId: 2235,
        variantColor: "Blue",
        variantImage: "./assets/vmSocks-blue-onWhite.jpg",
        variantQuantity: 0
      }
    ]
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    }
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    updateProduct(index) {
      this.selectedVariant = index
    }
  }
})
