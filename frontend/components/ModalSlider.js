import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Slider from "react-slick";
import { CSSTransition } from 'react-transition-group'

export default function ModalSlider(props){

    const [carousel, setCarousel] = useState()
    const listWork = useSelector(state => state.work.listWork)
    const isModal = props.modal === false ? false : true
    let shots = []
    
    if (props.modal){
        shots = listWork.filter(el => el.id === props.modal)[0].shots
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        arrows: false
      };

    const items = [
        {id: 1, title: 'item #1'},
        {id: 2, title: 'item #2'},
        {id: 3, title: 'item #3'},
        {id: 4, title: 'item #4'},
        {id: 5, title: 'item #5'}
      ]
    return(
        <>
            <div className={props.modal ? 'overlay overlayActive' : 'overlay'}></div>
            <div className={props.modal ? "btn-close btn-close-active" : "btn-close "} onClick={() => props.setModal(false)} ><i className="fa-solid fa-x"></i></div>
            <CSSTransition classNames="alert-anim" in={isModal} timeout={400} unmountOnExit>
                <div className={props.modal ? "modal-form-wrapper modal-form-wrapper-active" : "modal-form-wrapper"} onClick={() => props.setModal(false)}>
                    <div className="modal-slider-button button-left button" onClick={(e) => {carousel.slickPrev(); e.stopPropagation()}}>
                        <div>
                            <i className="fa-solid fa-chevron-left"></i>
                        </div>
                    </div>
                        <div className="modal-slider" onClick={(e) => e.stopPropagation()}>
                        <Slider  {...settings} ref={ref => setCarousel(ref)} >
                                {shots.map(item => (
                                    <div className="modal-slider-wrap" key={item.id}>
                                        <div className="modal-slider-item" 
                                            style={{
                                                backgroundImage: `url(${item.url_image})`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'contain',
                                                backgroundPosition: 'center',
                                            }}>

                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    <div className="modal-slider-button button-right button" onClick={(e) => {carousel.slickNext(); e.stopPropagation()}}>
                            <div>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>
                </div> 
            </CSSTransition>
        </>
    )
}   