//action of carts
import {ADD_TO_CART, REMOVE_ITEM, ADD_QUANTITY, SUB_QUANTITY} from '../action/action-types/carts-actions';
//
import * as ParsePrice from '../helper/parsePriceForSale';

//local storage
function getCartsFromLocalStorage(){
    return localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")): []
}
function SaveCartsToLocalStorage(carts){
    return carts ? localStorage.setItem("carts", JSON.stringify(carts)):null;
}
function returnTotal(){
    let tempCarts = getCartsFromLocalStorage();
    return tempCarts.reduce((total, ele) => {
        return total += (ele.price * ele.quantity*(1-(ele.sale/100)))
    }, 0) || 0;
}
const initState = {
    
    carts: getCartsFromLocalStorage(),
    total: returnTotal(),
    count: getCartsFromLocalStorage().length,

}
const cartsReducer= (state = initState,action)=>{
   
    //
    switch(action.type){
        case ADD_TO_CART: 
        {
            //có 2 TH xảy ra: item này đã có ta chỉ việc tăng quantity + 1 | và item này mới hoàn toàn
            // ta dùng existed_item là cờ. || action.payload là 1 object
            let existed_item = state.carts.find(item=> action.payload.id === item.id)
            //TH1: cái item này đã tồn tại
            if(existed_item){
                existed_item.quantity += 1;
                //clone nó ra và lưu local storage
                let tempCarts = [...state.carts];
                SaveCartsToLocalStorage(tempCarts);

                return{
                    ...state,
                    total: state.total + ParsePrice.priceAfterSaleNotParseToMoney(existed_item.price, existed_item.sale)
                }
            }
            else{
                let newCart = {...action.payload}
                newCart.quantity = 1;
                let tempCarts = [...state.carts];
                tempCarts.push(newCart)
                SaveCartsToLocalStorage(tempCarts);
                return {
                    carts: [...state.carts, newCart],
                    total: state.total + ParsePrice.priceAfterSaleNotParseToMoney(newCart.price, newCart.sale),
                    count: state.count + 1,
                }
            }
            
            
        }
        case REMOVE_ITEM:
        {
            //lấy ra item muốn xóa dựa trên id
            let itemRemove = state.carts.find(item => item.id === action.payload);
            //lấy ra danh sách khi ko còn item đang xóa dùng filter
            let new_items = state.carts.filter(item => action.payload !== item.id);
            //cập nhập lại total
            let newTotal = state.total - ParsePrice.priceAfterSaleNotParseToMoney((itemRemove.quantity * itemRemove.price), itemRemove.sale);
            //lưa local storage
            SaveCartsToLocalStorage(new_items);
            //state mới trả ra
            return{
                carts: new_items,
                total: newTotal,
                count: state.count - 1,
            }
        }
        case ADD_QUANTITY:
        {
            //lấy ra cái item muốn tăng quantity, dùng find thì get ra item nếu thay đổi nó thì cái item
            //đó trong mảng carts sẽ thay đổi quantity theo -> not pure fucntion
            let incItem = state.carts.find(item => item.id === action.payload);
            
            incItem.quantity += 1;
            
            let newTotal = state.total + ParsePrice.priceAfterSaleNotParseToMoney(incItem.price, incItem.sale);
            //clone cái carts
            let tempCarts = [...state.carts];
            SaveCartsToLocalStorage(tempCarts)
            return {
                ...state,
                carts: [...tempCarts],
                total: newTotal,
            }
        }
        case SUB_QUANTITY:
        {
            let decItem = state.carts.find(item => item.id === action.payload);
            decItem.quantity -= 1;
            let newTotal = state.total - ParsePrice.priceAfterSaleNotParseToMoney(decItem.price, decItem.sale);
            //
            let tempCarts = [...state.carts];
            SaveCartsToLocalStorage(tempCarts);
            return{
                ...state,
                carts: [...tempCarts],
                total: newTotal,
            }
        }
        default:
            return state;
    }
    
}

export default cartsReducer