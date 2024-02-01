import { Star, StarFill, StarHalf } from "react-bootstrap-icons";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const renderRating = (diem : number) => {
const stars = [];
for(let i=1;i<=5;i++){
    if(i<=diem){
        stars.push(<StarFill style={{color: "#f8d073"}}/>)
    }else if(i-0.5<=diem){
        stars.push(<StarHalf style={{color: "#f8d073"}}/>)
    }
    else{
        stars.push(<Star style={{color: "#f8d073"}}/>)
    }
}
return stars
}

export default renderRating