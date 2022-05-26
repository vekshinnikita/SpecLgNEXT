import React from 'react'
import parse from 'html-react-parser'
import { wrapper } from "../../state/store";
import { motion } from "framer-motion"
import { useSelector } from 'react-redux';
import CalcPrice from "../../components/CalcPrice";
import { getDetailServiceAPI, getMainServicesAPI } from '../../utils/api';
import { setDetailService, setMainServices } from '../../state/slices/services';

 


export default () => {


    const textAnimation = {
        hidden: {
            x: -100,
            opacity: 0,
        },
        visible: custom => ({
            x: 0,
            opacity: 1,
            transition: { 
                ease: [0, 0, 0.1, 1],
                delay: custom * 0.6+0.5 ,
                duration: 0.6,
            }, 
        })
    }

    const detailService = useSelector(state => state.services.detailService)
    


    return(
        <>
        <section className="main-section">
            <div className="backgroud-photo">
                <img src="/static/photo.webp" />
            </div>
            <motion.div 
                className="main-section-title"
                initial="hidden"
                viewport={{ once: true }}
                whileInView="visible"
            >
                <h1>СПЕЦЛОГИСТИКА</h1>
                <motion.h2 custom={0} variants={textAnimation} >Перевозка грузов по всей России.</motion.h2>
                <motion.h2 custom={1} variants={textAnimation} >Любые габариты и расстояния.</motion.h2>
            </motion.div>
            <div className="main-section-calc-price">
                <CalcPrice />
            </div>
        </section>
        <div className="service-post-section">
            <div className="wrapper">
            <h2 className="backgroud-text">{detailService.title}</h2>
            <div style={{
                zIndex: 10,
            }}>{parse(detailService.description)}</div>
            </div>
        </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store, action) => async (ctx) => {
        const slug = ctx.query.slug

        try{
            const dataService = await getDetailServiceAPI(slug)

            store.dispatch(setDetailService(dataService)) 

            const dataServices = await getMainServicesAPI()

            store.dispatch(setMainServices(dataServices)) 

        }catch (error) {
            console.log(error)
        }

        return {
            props: {}
        }
    }
)