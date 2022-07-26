import React, { useRef, useState, useEffect } from 'react'
import Carousel from 'react-elastic-carousel';
import ModalSlider from './ModalSlider';
import { useDispatch, useSelector } from 'react-redux'

import { getListWork } from '../state/slices/work'


export default function CompletedCarousel(){

    const [carousel, setCarousel] = useState()
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const list = useSelector(state => state.work.listWork)
    
    const items = [
          {id: 1, title: 'item #1'},
          {id: 2, title: 'item #2'},
          {id: 3, title: 'item #3'},
          {id: 4, title: 'item #4'},
          {id: 5, title: 'item #5'}
        ]

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 700, itemsToShow: 2, itemsToScroll: 1 },
        { width: 950, itemsToShow: 2},
        { width: 1200, itemsToShow: 2 }
        ];

    useEffect(() => {
        dispatch(getListWork())
    },[])

    const onImgLoad = () => {

        console.log('Hello')
    }

    return(
        <>
        <ModalSlider modal={modal} setModal={setModal} />
        <div className="completed-carousel">
            <div className="d-flex flex-column">
                <h3>Примеры нашей работы</h3>
                <div className="completed-buttons d-flex flex align-center">
                    <div className='completed-carousel-button' onClick={() => carousel.slidePrev()}><i className="fa-solid fa-arrow-left"></i></div>
                    <div className='completed-carousel-button' onClick={() => carousel.slideNext()}><i className="fa-solid fa-arrow-right"></i></div>
                </div>
            </div>
            

            <Carousel itemPadding={[40, 5]} ref={ref => setCarousel(ref)} breakPoints={breakPoints}>
                {list.map(item => (
                    <div 
                        className="completed-item" 
                        key={item.id} 
                        onClick={() => setModal(item.id)}
                        style={{
                            backgroundImage: `url(${item.shots[0].url_image})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        >
                        <div className="carousel-item-date">
                            {item.date}
                        </div>
                        <div className="completed-item-info">
                            <h4>{item.title}</h4>
                            <p>{item.summary}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
            <div className="completed-buttons-mobile d-flex flex align-center">
                    <div className='completed-carousel-button' onClick={() => carousel.slidePrev()}><i className="fa-solid fa-arrow-left"></i></div>
                    <div className='completed-carousel-button' onClick={() => carousel.slideNext()}><i className="fa-solid fa-arrow-right"></i></div>
                </div>
        </div>
        </>
    )
}