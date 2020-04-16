import React, { Component } from 'react'
import Product from './Product';
import './listProducts.css'


//data
const data = [{
    id: 1,
    name: 'Sneaker',
    images: ['https://salt.tikicdn.com/cache/w1200/ts/product/99/d4/6e/854abebbca803dcc83257af972a047ef.jpg'],
    realPrice: 500000,
    rating: 5,
    sale: 25
},
{
    id: 2,
    name: 'Áo sơ mi',
    images: ['https://salt.tikicdn.com/cache/w1200/ts/product/df/89/46/7da6331d1f653db90a8621b44e7f83cb.jpg'],
    realPrice: 120000,
    rating: 4,
    sale: 35
},
{
    id: 3,
    name: 'Thắt lưng',
    images: ['https://salt.tikicdn.com/cache/w1200/ts/product/42/78/24/ce88efc165f80f68f1c0c5529500e7d1.jpg'],
    realPrice: 80000,
    rating: 4,
    sale: 30
},
{
    id: 4,
    name: 'Quần tây',
    images: ['https://salt.tikicdn.com/cache/w1200/ts/product/66/47/27/435aa98eba26a1e90695a3bb750fcacc.jpg'],
    realPrice: 300000,
    rating: 3,
    sale: 20
},
{
    id: 5,
    name: 'Áo thun',
    images: ['https://salt.tikicdn.com/cache/w1200/ts/product/99/a7/fb/b5af5c666b2b90ea0c910592b7cc19b1.jpg'],
    realPrice: 180000,
    rating: 2,
    sale: 40
},
{
    id: 6,
    name: 'Áo khoác',
    images: ['https://salt.tikicdn.com/cache/w1200/ts/product/36/77/2d/ef647afcc1ebeb49c642d079b289c561.jpg'],
    realPrice: 400000,
    rating: 5,
    sale: 10
}
];

export default class ListProducts extends Component {
    render() {
        
        return (
            <div className="listProduct">
                {
                    data.map((ele) => {
                        return <Product key={ele.id} product={{...ele}}></Product>
                    })
                }
            </div>
        )
    }
}
