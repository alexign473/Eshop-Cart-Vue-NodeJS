Vue.component('cart', {
    data() {
        return {
            cartItems: [],
            showCart: true,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product)
            if (find) {
                find.quantity++
            } else {
                let prod = Object.assign({ quantity: 1 }, product)
                console.log(prod)
                this.cartItems.push(prod)
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                item.quantity--
            } else {
                this.cartItems.splice(this.cartItems.indexOf(item), 1)
            }
        },
    },
    mounted() {

    },
    template: `
    <div>
        <button class="btn-cart"><img src="img/cart.png" alt="cart img" 
        width="30px" height="30px" @click="showCart = !showCart" /></button>
        <div class="cart-block" v-show="showCart">
            <p v-if="!cartItems.length">Cart is empty</p>
            <cart-item class="cart-item" 
            v-for="item of cartItems" 
            :key="item.id_product"
            :cart-item="item" 
            
            @remove="remove">
            </cart-item>
        </div>
    </div>
    `
})
Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="cartItem.imgPath" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
                            <p class="product-single-price">$&nbsp{{cartItem.price}} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">$&nbsp{{cartItem.quantity*cartItem.price}}</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
});