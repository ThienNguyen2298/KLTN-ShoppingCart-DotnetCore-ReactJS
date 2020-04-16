import React from 'react';
import Banner from '../components/banner/Banner';

import { Link } from 'react-router-dom';
import ListProducts from '../components/products/ListProducts';

export default function Home() {
    return (
        <div style={{background: '#ebebeb'}}>
            <Banner></Banner>
            <ListProducts></ListProducts>
        </div>
    )
}
