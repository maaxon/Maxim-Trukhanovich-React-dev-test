import {makeAutoObservable} from "mobx"
import currencyState from '../Currencies/Currencies'
import isEqual from 'lodash/isEqual';

class Cart{
    items=[]

    overlayActive=false

    constructor() {
        makeAutoObservable(this)
    }


    addToCart(product,selectedOptions){
        const matched = this.items.find(item=>isEqual(item.selectedOptions,selectedOptions) && item.id===product.id)
        if (matched) {
            const index = this.items.indexOf(matched)
            this.items[index].count += 1
        }else {
            this.items.push({...product,selectedOptions,count:1})
        }

        this.switchOverlay()
    }

    incrementProductCount=(index)=>{
        this.items[index].count += 1
    }

    decrementProductCount=(index)=>{
        this.items[index].count -=1

        if (this.items[index].count  === 0) {
            this.items = this.items.filter((item,idx)=>idx !== index)
        }
    }

    getTotal(){
        const total =this.items.reduce((sum, item) => {
            const price = item.prices.find(prices => prices.currency.symbol === currencyState.currency)
            return sum + price.amount * item.count
        }, 0)
        return Math.floor((total*100))/100
    }
    getQuantity(){
        return this.items.reduce((sum,item)=>{
           return sum + item.count
        },0)
    }

    switchOverlay=()=>{

        this.overlayActive = !this.overlayActive
        if (this.overlayActive){
            document.body.style.overflow ="hidden"
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
        else document.body.style.overflow =""
    }

}

export default new Cart()