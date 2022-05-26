import { motion } from "framer-motion"
import CalcPrice from "../../components/CalcPrice";
import React from 'react'
import { setMainServices } from '../../state/slices/services';
import { wrapper } from "../../state/store";
import { getMainServicesAPI, getWorkFilterAPI, getWorkTagsAPI } from '../../utils/api';
import Link from 'next/link'
import { setListWork, setWorkTags } from "../../state/slices/work";
import { useSelector } from "react-redux";

export default (props) => {

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

    const list = useSelector(state => state.work.listWork)
    const tags = useSelector(state => state.work.listTags)

    console.log(props.tag)


    return (
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

            <div className="completed-list">
                <div className="wrapper">
                    <h2>
                        {props.tag ? (
                            "#" + props.tag
                        ) : (
                            'Все проекты'
                        )}
                    </h2>
                    <div className="project-tags">
                        { tags.map((item) => (
                            <Link key={item.id} href={"?tag="+ item.name}>
                            <a >
                                #{item.name}
                            </a>
                            </Link>
                        ))}

                    </div>
                    <div className="projects-row">
                        { list.map((item) => (
                            <div className="completed-item" key={item.id} onClick={() => setModal(item.id)}>
                                <div className="carousel-item-date">
                                    {item.date}
                                </div>
                                <img src={item.shots[0].url_image} />
                                
                                <div className="completed-item-info">
                                    <h4>{item.title}</h4>
                                    <p>{item.summary}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store, action) => async (ctx) => {

        const tag = ctx.query.tag ? ctx.query.tag : null
  
        try{
            const dataServices = await getMainServicesAPI()
  
            store.dispatch(setMainServices(dataServices)) 

            const dataWork = await getWorkFilterAPI(tag)

            store.dispatch(setListWork(dataWork))
            
            const dataTags = await getWorkTagsAPI()

            store.dispatch(setWorkTags(dataTags))
            
  
        }catch (error) {
            console.log(error)
        }
  
        return {
            props: {tag: tag}
        }
    }
  )