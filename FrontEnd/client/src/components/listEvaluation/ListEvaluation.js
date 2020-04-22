import React, { Component } from 'react'
import DisplayEvaluation from '../displayEvaluation/DisplayEvaluation'

export default class ListEvaluation extends Component {
    render() {
        return (
            <div>
               <h4>CÁC NHẬN XÉT KHÁC</h4>
               <DisplayEvaluation avatar={null} fullname={"Hữu Thiện"} star={4} evaluation={"Đẹp lắm shop ơi"}></DisplayEvaluation>
               <DisplayEvaluation avatar={null} fullname={"Nguyễn Thị Phương Mai"} star={3} evaluation={"đẹp dễ sợ"}></DisplayEvaluation>
               <DisplayEvaluation avatar={null} fullname={"Trần Thị Long Lanh Lóng Lánh Ánh Bình Minh"}
               star={2} evaluation={"Mới nhận được hàng, giao hàng nhanh. Chất lượng tốt, là hàng chính hãng, còn được tặng kèm que chọc sim và một bao đựng siêu cute luôn. Tai nghe nghe thì miễn chê, rất hay. Hồi trước mình có một cái tai nghe chính hãng nhưng bị hỏng mất, nên tìm cái khác để mua, lúc đầu cũng đắn đo suy nghĩ nhưng khi mua về thù cảm thấy rất hài lòng. Cảm ơn shop. Sẽ ủng hộ shop, Mới nhận được hàng, giao hàng nhanh. Chất lượng tốt, là hàng chính hãng, còn được tặng kèm que chọc sim và một bao đựng siêu cute luôn. Tai nghe nghe thì miễn chê, rất hay. Hồi trước mình có một cái tai nghe chính hãng nhưng bị hỏng mất, nên tìm cái khác để mua, lúc đầu cũng đắn đo suy nghĩ nhưng khi mua về thù cảm thấy rất hài lòng. Cảm ơn shop. Sẽ ủng hộ shop"}></DisplayEvaluation>
            </div>
        )
    }
}
