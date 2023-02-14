// Component that builds a review card for a given restaurant, formatting input data neatly to be
// used in a list next to the pizza map.

import React from "react";


const  Review = (props) => {
return (
    <>
<div>
    <div className="review-header">
    <div>{props.name}</div>
    <div>{props.city}</div>
    <div>{props.score}</div>
    <div>{props.price}</div>
    </div>
    <h3>Crust: {props.crust}</h3>
    <h3>Cheese: {props.cheese}</h3>
    <h3>Sauce: {props.sauce}</h3>
</div>
</>
)
};

export default Review;