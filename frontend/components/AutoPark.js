import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import React, { useState, useEffect, useRef } from 'react'
import AutoPark from '../staticInfo/AutoparkItems'
import {useWindowDimensions} from '../service/service'
import { useDispatch } from 'react-redux'
import { showModal } from '../state/slices/components'

function Button(props){
    const {
        active,
        text,
        handleClick
    } = props
    const activeButton = active.title === text

    return (
        <div style={{position: 'relative'}}>
        <motion.div
            onClick={handleClick}
            className='autopark-button'
        >
            <span>{text}</span>
        </motion.div>
        {activeButton && <ActiveBackground/>}
        </div>

    )
}

function ActiveBackground(){
    return(
        <motion.div
        layoutId="activeItem"
        style={{
            width: "100%",
            height: "100%",
            zIndex: 0,
            position: "absolute",
            top: "0px",
            left: "0px",
            backgroundColor: "#e4ba4b"
      }}
    />
    )
}

function AutoParkElement(){
    const dispatch = useDispatch()

    const variants = {
        show: {
            opacity: 1,
        },
        hidden: {
            opacity: 0, 
        },
        exit: {
            opacity: 0,
        }
      };

    const [active, setActive] = useState(AutoPark.filter(el => el.title === 'ГАЗЕЛЬ')[0])

    const buttons = AutoPark.reduce((acc, el) => {
        return [...acc, el.title]
    },[])

    const handleFilter = (selector) => {
        setActive(AutoPark.filter(el => el.title === selector)[0])
    }

    return(
        <>
            <AnimateSharedLayout>
                <div 
                    className='autopark-button-row'
                >
                    {buttons.map(btn =>(
                        <Button
                            active={active}
                            key={btn}
                            text={btn}
                            handleClick={() => handleFilter(btn)}
                        />
                    ))}
                </div>
            </AnimateSharedLayout>
            
            <div className='autopark-active'>
            <AnimatePresence  exitBeforeEnter>
            
                <motion.div 
                    key={active.title + ' img'}
                    initial={{opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0}}
                    transition={{duration: 0.5}}
                    className='autopark-photo'
                >
                    <motion.img src={active.photo}  alt={active.title}/>
                </motion.div>
                
                <motion.div
                    key={active.title + 'info'}
                    initial={{opacity: 1}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 1,}}
                    className="autopark-active-info"
                >   
                    <div>
                        <h4>Грузоподъёмность</h4>
                        <h5>{active.capacity}</h5>
                        <h4>Тариф</h4>
                        <h5>{active.tariff}</h5>
                        <div className="btn-order button" onClick={() => dispatch(showModal(active.id))} style={{backgroundColor: '#e4ba4b', width: '100%'}}>
                            ЗАКАЗАТЬ
                        </div>
                    </div>
                </motion.div>
                </AnimatePresence>
            </div>            
            </>
    )
}

function AutoParkElementMibile(props){

    const [widthInner, setWidthInner] = useState()
    const carousel = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        setWidthInner(carousel.current.scrollWidth - carousel.current.offsetWidth)
    },[props.width])


    return(
        <div ref={carousel} className="autopark-carousel">
            <motion.div  
                className="autopark-inner-carousel"
            >
                { AutoPark.map((el) => (
                <div key={el.title} className="autopark-carousel-item">
                        <div className="auto-img-mobile">
                            <img src={el.photo}  alt={el.title}/>
                        </div>
                        <h3>{el.title}</h3>
                        <h4>ГРУЗОПОДЪЁМНОСТЬ</h4>
                        <h5>{el.capacity}</h5>
                        <h4>ТАРИФ</h4>
                        <h5>{el.tariff}</h5>
                        <div className="btn-order button" onClick={() => dispatch(showModal(el.id))} style={{backgroundColor: '#e4ba4b', width: '100%'}}>
                            ЗАКАЗАТЬ
                        </div>
                </div> 
                ))}
            </motion.div >
        </div>
    )
}

export default function AutoParkBlock(){
    const width = useWindowDimensions()

    return(
        <>
            {(width >= 640)? (
                <AutoParkElement/>
            ):(
                <AutoParkElementMibile width={width}/>
            )}
        </>
    )
    
}
