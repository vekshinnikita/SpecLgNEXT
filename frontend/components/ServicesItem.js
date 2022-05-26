import React from 'react'
import { useDispatch } from "react-redux";
import { showModal } from '../state/slices/components';
import Link from 'next/link'


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
            <Link href={'/services/' + props.item.slug}>
                    <a>
            <div className="btn-order">
                        ПОДРОБНЕЕ
            </div>
            </a>
                </Link>
        </div>
    )
}