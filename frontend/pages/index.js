import React, { useState } from "react";
import { motion } from "framer-motion"
import CalcPrice from "../components/CalcPrice";
import ServicesItem from "../components/ServicesItem";
import ModalForm from "../components/ModalForm";

import AutoPark from "../components/AutoPark";
import { CSSTransition } from 'react-transition-group'
import CompletedCarousel from "../components/CompletedCarousel";
import { useSelector } from "react-redux";
import Alert from "../components/Alert";
import MainLayout from "../layout/MainLayout";
import { wrapper } from "../state/store";
import { getListWorkAPI, getMainServicesAPI } from "../utils/api";
import { setMainServices } from "../state/slices/services";
import { setListWork } from "../state/slices/work";



export default function MainPage(){

    const [modalForm, setModalForm] = useState(false)
    const services = useSelector(state => state.services.mainServices)
    const alert = useSelector(state => state.components)

    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        arrows: false

      };

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
    const proccesAnimation = {
        hidden: {
            opacity: 0,
        },
        visible: custom => ({ 
            opacity: 1,
            transition: { 
                delay: custom * 0.4+0.2 ,
                duration: 0.4,
            }, 
        })
    }

    const lineAnimation ={
        hidden: {
            width: '0',
        },
        visible: {
            width: '80%',
            transition: {
                delay: 0.6,
                duration: 2.2,
            }
        }
    }


    return (
        <MainLayout>
            <ModalForm modalForm={modalForm} setModalForm={setModalForm}/>
            <CSSTransition classNames="alert-anim" in={alert.isAlert} timeout={400} unmountOnExit>
                <Alert />
            </CSSTransition>
            <section id="main" className="main-section">
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
                    <motion.h2 custom={0} variants={textAnimation} style={{display: 'flex', alignItems: 'center'}}>Перевозка грузов <div className="overlay-text">по всей России.</div></motion.h2>
                    <motion.h2 custom={1} variants={textAnimation} >Любые габариты и расстояния.</motion.h2>
                </motion.div>
                <div className="main-section-calc-price">
                    <CalcPrice />
                </div>
            </section>

            <section className="main-section-calc-price-mobile">
                <CalcPrice />
            </section>

            <section id="services" className="services-section">
                <div className="section-wrapper">
                    <h2 className="backgroud-text">УСЛУГИ</h2>
                    <h3>Для каждого клиента индивидуально подбираем оптимальный способ доставки груза</h3>
                    <div className="services-row">
                        {services.map(el => <ServicesItem setModalForm={setModalForm} item={el} key={el.id}/>)}
                    </div>
                </div>
            </section>

            <section id="completed-work" className="services-section completed-work" style={{backgroundColor: "#99afa1"}}>
                <div className="section-wrapper">
                    <h2 className="backgroud-text" style={{color: "#71917d", lineHeight:'1'}} >ВЫПОЛНЕННЫE <br/>ЗАКАЗЫ</h2>
                    <CompletedCarousel />
                </div>
            </section>

            <section id="autopark" className="services-section section-autopark" style={{backgroundColor: "#252927"}}>
                <div className="section-wrapper">
                    <h2 className="backgroud-text" style={{color: '#38372b'}}>АВТОПАРК</h2>
                    <h3 id='autopark-h3' style={{color: '#fff'}}>Каждый груз индивидуален.<br/>В зависимости от его особенностей, маршрута и сроков доставки мы предложим наиболее подходящий транспорт.</h3>
                    {process.browser && <AutoPark /> }
                                
        
                </div>
            </section>

            <section id="additional" className="services-section" style={{backgroundColor: "#99afa1"}}>
                <div className="section-wrapper">
                    <h2 className="backgroud-text" style={{color: '#647c6e'}}>СЕРВИСЫ</h2>
                    <h3 style={{color: '#fff'}}>Воспользуйтесь нашими дополнительными сервисами!</h3>
                    <div className="additional-row " style={{marginTop: '50px'}}>
                        <div className="additional-item">
                            <img src="static/magnifier.svg"/>
                            <div>
                            <h4>Отслеживание груза</h4>
                            <p>Оповестим о местонахождении груза из любой точки маршрута.</p>
                            </div>
                        </div>
                        <div className="additional-item">
                            <img src="static/box.svg"/>
                            <div>
                            <h4>Страхование</h4>
                            <p>Предоставим дополнительные гарантии сохранности вашего груза при перевозке.</p>
                            </div>
                        </div>
                        <div className="additional-item">
                            <img src="static/loader.svg"/>
                            <div>
                            <h4>Грузчики</h4>
                            <p>Квалифицированные специалисты помогут вам бережно погрузить и разгрузить отправку.</p>
                            </div>
                        </div>
                        <div className="additional-item">
                            <img src="static/small-crane.svg"/>
                            <div>
                                <h4>Аренда спецтехники</h4>
                                <p>Если груз требует особого обращения, прибегнем к помощи специальных устройств на любом этапе транспортировки.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <section id="proccess" className="services-section pb-40" >
                <div className="section-wrapper proccess-wrapper">
                
                    <h2 className="backgroud-text" style={{fontSize: '7.4em'}}>ПРОЦЕСС РАБОТЫ</h2>
                    <motion.div 
                        initial="hidden"
                        viewport={{ once: true }}
                        whileInView="visible"
                        className="proccess-row"
                        >
                            <div className="svg-line">
                                <motion.svg  variants={lineAnimation} xmlns="http://www.w3.org/2000/svg" width="100%" height="3" fill="none" m_init="2259300202204070759"> 
                                    <motion.line  x1="0.981934" y1="1.01785" x2="2010.98" y2="1.01785" stroke="#CFA22D" strokeWidth="2" strokeDasharray="10.1 10.1"/> 
                                </motion.svg>
                            </div>
                        <motion.div custom={1} variants={proccesAnimation} className="proccess-item item-end">
                            <img src="/static/circle-mark.svg"/>
                            <div className="backgroud-text">1</div>
                            <div className="proccess-paragraph">
                                <p>Вы отправляете заявку</p>
                            </div>
                        </motion.div>
                        <motion.div custom={2} variants={proccesAnimation} className="proccess-item">
                            <img src="/static/circle-mark.svg"/>
                            <div className="backgroud-text">2</div>
                            <div className="proccess-paragraph">
                                <p>Мы рассчитываем ваш запрос и отвечаем на ваши вопросы</p>
                            </div>
                        </motion.div>
                        <motion.div custom={3} variants={proccesAnimation} className="proccess-item item-end">
                            <img src="/static/circle-mark.svg"/>
                            <div className="backgroud-text">3</div>
                            <div className="proccess-paragraph">
                                <p>Мы оформляем документы. Предоплата*</p>
                            </div>
                        </motion.div>
                        <motion.div custom={4} variants={proccesAnimation} className="proccess-item">
                            <img src="/static/circle-mark.svg"/>
                            <div className="backgroud-text" >4</div>
                            <div className="proccess-paragraph">
                                <p>Мы перевозим груз</p>
                            </div>
                        </motion.div>
                        <motion.div custom={5} variants={proccesAnimation} className="proccess-item item-end">
                            <img src="/static/circle-mark.svg"/>
                            <div className="backgroud-text">5</div>
                            <div className="proccess-paragraph">
                                <p>Груз доставлен Приём и оплата</p>
                            </div>
                        </motion.div>
                    </motion.div>
                    <p className="flaxible-payment">*Для постоянных клиентов возможна гибкая система оплаты!</p>
                </div>
            </section>
            
        </MainLayout>
    )
}
export const getServerSideProps = wrapper.getServerSideProps(
    (store, action) => async (ctx) => {

        try{
            const dataServices = await getMainServicesAPI()

            store.dispatch(setMainServices(dataServices)) 

            const dataWork = await getListWorkAPI()

            store.dispatch(setListWork(dataWork))
        }catch (error) {
            console.log(error)
        }

        return {
            props: {}
        }
    }
)