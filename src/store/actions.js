import {
    ADD_COUNTER,
    ADD_TO_CART
} from "./mutation-types";

export default {
    addToCart(context,payload) {
        return new Promise((resolve,reject) => {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

            if(oldProduct) {
                // oldProduct.count++
                context.commit(ADD_COUNTER,oldProduct)
                resolve('当前的商品数量+1')
            }else{
                context.commit(ADD_TO_CART,payload)
                payload.count = 1
                // context.state.cartList.push(payload)
                resolve('添加了新的商品')
            }
        })
    }
}