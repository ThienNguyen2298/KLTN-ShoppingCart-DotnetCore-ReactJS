import React from 'react';
import BreadScrumb from '../components/BreadScrumb/BreadScrumb';
import Detail from '../components/productDetail/Detail'

export default function ProductDetail() {
    return (
        <>
            <div style={{width: '72%', margin: '0 auto'}}>
                <BreadScrumb></BreadScrumb>
                <Detail></Detail>
            </div>
        </>
    )
}
