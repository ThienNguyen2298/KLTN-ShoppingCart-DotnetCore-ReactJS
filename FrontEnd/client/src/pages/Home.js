import React, {useEffect} from 'react';
import Banner from '../components/banner/Banner';



import ListProducts from '../components/products/ListProducts';


export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0)

        
    }, [])
    return (
        <div style={{background: '#ebebeb'}}>
            <Banner></Banner>
            <ListProducts></ListProducts>
        </div>
    )
}
