import { createSlice } from '@reduxjs/toolkit'


const getBasketFromStorage = () => {
    if(localStorage.getItem("basket")){
        return JSON.parse(localStorage.getItem("basket"));
    }
    return [];
}


const initialState = {
    products: getBasketFromStorage(),
    drawer: false,
    totalAmount: 0
}

//Sepeti local storage'a kaydet
const writeFromBasketToStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket))
}

//Sepetin toplam tutarını hesapla
const calculateTotal = (products) => {
    return products.reduce((total, product) => {
        return total + product.price * product.count
    },0)
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        //Sepete ürün ekleme
        addToBasket: (state, action) => {
            const findProduct = state.products.find(
                (product) =>
                    String(product.id) === String(action.payload.id)
            )

            if (findProduct) {
                const extractedProducts = state.products.filter(
                    (product) =>
                        String(product.id) !== String(action.payload.id)
                )

                findProduct.count += action.payload.count

                state.products = [...extractedProducts, findProduct]
            } else {
                state.products.push(action.payload)
            }

            writeFromBasketToStorage(state.products)
            state.totalAmount = calculateTotal(state.products)
        },
        setDrawer: (state) => {
            state.drawer = !state.drawer;
        },
        calculateBasket : (state) => {
            state.totalAmount = calculateTotal(state.products)
        },
        removeFromBasket: (state, action) => {
            //silinecek ürünün id alıp diğer ürünleri koruyoruz
            state.products = state.products.filter(
                (product) => String(product.id) !== String(action.payload) //string kullanma sebebimiz id bazen metin bazense sayı olması
            );
            //Güncel sepeti local storage kaydet
            writeFromBasketToStorage(state.products);
            //silme işleminden sonra total tutarı yeniden hesaplıyoruz 
            state.totalAmount = calculateTotal(state.products);
        },
        //Ürün adedini artırma
        increaseProductCount: (state,action) => {
            const product = state.products.find(
                (product) => String(product.id) === String(action.payload)
            )
            if(product){
                product.count += 1
            }
            writeFromBasketToStorage(state.products)
            state.totalAmount = calculateTotal(state.products)
        },
        //Ürün adedini azaltma
        decreaseProductCount: (state, action) => {
            const product = state.products.find(
                (product) =>
                    String(product.id) === String(action.payload)
            )

            // Adet 1'in altına düşmesin
            if (product && product.count > 1) {
                product.count -= 1
            }

            writeFromBasketToStorage(state.products)
            state.totalAmount = calculateTotal(state.products)
        }
    }
})

export const {addToBasket , setDrawer, calculateBasket, removeFromBasket, increaseProductCount, decreaseProductCount} = basketSlice.actions;
export default basketSlice.reducer;