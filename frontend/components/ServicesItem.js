import React from 'react'
import { useDispatch } from "react-redux";
import { showModal } from '../state/slices/components';


export default function ServicesItem(props){

    const dispatch = useDispatch()


    return (
        <div className={"services-item" + " services-item-" + props.item.id}>
            <div className="item-wrapper">
                <div className="dropup-services">
                    <h5>{props.item.title}</h5>
                    <p>{props.item.summary}</p>
                </div>
                <h4>{props.item.title}</h4>
                <img src={props.item.service_image}/>
            </div>
            <div className="btn-order" onClick={() => dispatch(showModal(props.item.id))}>ЗАКАЗАТЬ</div>
        </div>
    )
}