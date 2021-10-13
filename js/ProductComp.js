Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgProduct: 'img/product-1.jpg',
        }
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`getProducts.json`)
            .then(data => {
                for (let item of data) {
                    this.products.push(item)
                    this.filtered.push(item)
                }
            })
    },
    template: `
    <div class="row">
        <product v-for="item of filtered" :key="item.id_product" :img="imgProduct" :product="item"></product>
    </div>
    `
})

Vue.component('product', {
    props: ['product', 'img'],
    template: `
    <div class="col-4">
        <img :src="img" alt="Some img" />
        <h4>{{product.product_name}}</h4>
        <p>\${{ product.price }}</p>
        <button class="btn" @click="$root.$refs.cart.addProduct(product)">Add to cart</button>
      </div>
    `
})