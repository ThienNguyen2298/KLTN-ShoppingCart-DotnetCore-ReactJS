export function parsePrice(price){
    return price ? (price).toLocaleString(undefined):0;
    
}
export function parsePriceSale(price, sale){
    return ((price*(100-sale))/100).toLocaleString(undefined) || 0;
}
export function priceAfterSaleNotParseToMoney(price, sale){
    return (price*(1-(sale/100)));
}