import React,{useEffect} from 'react';
import BreadScrumb from '../components/BreadScrumb/BreadScrumb';
import Detail from '../components/productDetail/Detail';
import Evalution from '../components/evalution/Evaluation'
import ListEvaluation from '../components/listEvaluation/ListEvaluation';

export default function ProductDetail(){
    
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div style={{width: '72%', margin: '0 auto'}}>
                <BreadScrumb title="Chi tiết sản phẩm"></BreadScrumb>
                <Detail></Detail>
                <Evalution></Evalution>
                <ListEvaluation></ListEvaluation>
            </div>
        </>
    )
    
    
}
