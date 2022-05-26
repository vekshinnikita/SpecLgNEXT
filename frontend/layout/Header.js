import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-scroll';
import { motion, useViewportScroll, useTransform } from "framer-motion"
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Links from 'next/link'


function Layout(props){

    

    return (
        <>
            <div onClick={() => props.setBurgerMenu(false)} className={props.burgerMenu ? 'overlay overlayActive' : 'overlay'}></div>
            <div className={props.burgerMenu ? 'header-menu header-menu-active' : 'header-menu'}>
                <div onClick={() => props.setBurgerMenu(false)} className="btn-close btn-close-active" style={{color: '#fff'}}><i className="fa-solid fa-x"></i></div>
                <div className="header-menu-title"><a href="#">СПЕЦЛОГИСТИКА</a></div>
                <ul>
                    <li>
                        <Link to="services" spy={true} smooth={true} offset={-100} duration={500} onClick={() => props.setBurgerMenu(false)}>Услуги</Link>
                    </li>
                    <li onClick={() => props.setBurgerMenu(false)}>
                        <Link to="additional" spy={true} smooth={true} offset={-100}  duration={500} onClick={() => props.setBurgerMenu(false)}>Сервисы</Link>
                    </li>
                    <li onClick={() => props.setBurgerMenu(false)}>
                        <Link to="completed-work" spy={true} smooth={true} offset={-100} duration={500} onClick={() => props.setBurgerMenu(false)}>Выполненные заказы</Link>
                        </li>
                    <li onClick={() => props.setBurgerMenu(false)}>
                        <Link to="contacts" spy={true} smooth={true} offset={-100} duration={500} onClick={() => props.setBurgerMenu(false)}>Контакты</Link>
                    </li>
                </ul>
                <div className="header-menu-contact">
                    <div>
                        <div>E-mail</div>
                        <span>info@spec-lg.ru</span>
                    </div>
                    <div>
                        <div>Заказать обратный звонок</div>
                        <span>+7-999-209-99-88</span>
                    </div>
                </div>
            </div>
        </>
    )
}

function DropDownList(props){

    const list = useSelector(state => state.services.mainServices)
    const {
        anchorRef,
        setOpen,
        open
    } = props

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
          event.preventDefault();
          setOpen(false);
        } else if (event.key === "Escape") {
          setOpen(false);
        }
      }

    
    return(
        <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            style={{position: 'absolute',top: 'auto', bottom: '-90%', left: '100px', marginLeft: "70px"}}
            transition
            disablePortal
            >
            
            {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}

            >
              <Paper style={{backgroundColor: '#252927'}}>
                <ul className='dropdown-list'>
                        {list.map((el) => (
                            <li key={el.id}><Links href={`/services/${el.slug}`}><a >{el.title}</a></Links></li>
                        ))}
                    </ul>
              </Paper>
            </Grow>
          )}
            
        </Popper>
    )
}

function NavigateItems(){


    const handleMouseEnter = (event) => {
        const label = document.getElementById(event.target.dataset.id).classList
        if (!label.contains('hovered')){
            label.add('hovered')
        }
    }

    const handleMouseLeave = (event) => {
        const label = document.getElementById(event.target.dataset.id).classList
        if (label.contains('hovered')){
            label.remove('hovered')
        }
    }

    return(
        <div className="navigate-items-row">
            <div className='label-navigate' style={{top: '3px'}} id="mainNav">Главная</div>
            <Link to="main" data-id="mainNav" spy={true} smooth={true} offset={-100} duration={500} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
            <div className='label-navigate' style={{top: '45px', left: '-90px'}}  id="servicesNav">Услуги</div>
            <Link to="services" data-id="servicesNav" spy={true} smooth={true} offset={-100} duration={500} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
            <div className='label-navigate' style={{top: '87px', left: '-104px'}}  id="additionalNav">Сервисы</div>
            <Link to="additional" data-id="additionalNav" spy={true} smooth={true} offset={-100} duration={500} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
            <div className='label-navigate' style={{top: '130px', left: '-105px'}}  id="autoparkNav">Автопарк</div>
            <Link to="autopark" data-id="autoparkNav" spy={true} smooth={true} offset={-100} duration={500} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
            <div className='label-navigate' style={{top: '172px', left: '-153px'}}  id="proccessNav">Процесс работы</div>
            <Link to="proccess" data-id="proccessNav" spy={true} smooth={true} offset={-100} duration={500} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
            <div className='label-navigate' style={{top: '213px', left: '-186px'}}  id="completedNav">Выполненные заказы</div>
            <Link to="completed-work"  data-id="completedNav" spy={true} smooth={true} offset={-100} duration={500} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
            <div className='label-navigate' style={{top: '255px', left: '-105px'}} id="contactsNav">Контакты</div>
            <Link to="contacts" data-id="contactsNav" spy={true} smooth={true} offset={-100} duration={500} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        </div>
    )
}

export default () => {
    const { scrollY } = useViewportScroll()
    const [ burgerMenu, setBurgerMenu ] = useState(false)
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const dispatch = useDispatch()

    const opacity = useTransform(scrollY, [ 0, 1], ["rgba(0,0,0,0.3)", "#252927"])

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };
    

    return (
        <>
        <Layout burgerMenu={burgerMenu} setBurgerMenu={setBurgerMenu}/>
        <NavigateItems />
        <motion.header 
            style={{ backgroundColor: opacity}}
        >
            <div className="header-logo">
                <Links href="/">
                    <a>СПЕЦЛОГИСТИКА</a>
                </Links>
            </div>
            <div className="header-logo-mobile"><svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 100 100" fill="none" m_init="2259300202204070759"> <path d="M65.9707 71.1778C57.0507 71.9778 49.6507 72.3778 43.7707 72.3778C39.8507 72.3778 36.9707 71.4578 35.1307 69.6178C33.2907 67.7778 32.3707 64.8978 32.3707 60.9778V41.7778C32.3707 37.5778 33.3107 34.5378 35.1907 32.6578C37.1107 30.7378 40.1707 29.7778 44.3707 29.7778H65.9707V38.1778H46.7707C44.3707 38.1778 43.1707 39.3778 43.1707 41.7778V60.9778C43.1707 61.8978 43.4307 62.6378 43.9507 63.1978C44.5107 63.7178 45.2107 63.9778 46.0507 63.9778C46.8907 63.9778 47.8107 63.9778 48.8107 63.9778C49.8107 63.9378 50.8507 63.8978 51.9307 63.8578C53.0107 63.8178 54.0907 63.7778 55.1707 63.7378C56.2907 63.6978 57.7107 63.6178 59.4307 63.4978C61.1907 63.3778 63.3707 63.2378 65.9707 63.0778V71.1778Z" fill="white"/> <circle cx="50" cy="50" r="47.5" stroke="white" strokeWidth="5"/> </svg></div>
            <ul>
                <li 
                    ref={anchorRef}
                    onMouseEnter={handleToggle}
                    onMouseLeave={handleToggle}
                    className='dropdown-li'
                    aria-controls={open ? "composition-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    id="composition-button"
                    aria-haspopup="true"
                >
                    <Link to="services" spy={true} smooth={true} offset={-100} duration={500}>Услуги</Link>
                    <DropDownList setOpen={setOpen} open={open} anchorRef={anchorRef}/>
                </li>
                <li>
                    <Link to="additional" spy={true} smooth={true} offset={-100}  duration={500}>Сервисы</Link>
                </li>
                <li>
                    <Link to="completed-work" spy={true} smooth={true} offset={-100} duration={500}>Выполненные заказы</Link>
                    </li>
                <li>
                    <Link to="contacts" spy={true} smooth={true} offset={-100} duration={500}>Контакты</Link>
                </li>
            </ul>
            <ul className='header-contact-info'>
                <li><a href="https://api.whatsapp.com/send/?phone=79992099988&text&app_absent=0"><i className="fa-brands fa-whatsapp"></i> WhatsApp</a></li>
                <li><a href="mailto:Info@spec-lg.ru"><i className="fa-solid fa-envelope"></i> info@spec-lg.ru</a></li>
                <li><i className="fa-solid fa-phone"></i> +7-999-209-99-88</li>
            </ul>
            <ul className='header-mobile'>
                <li><a href="https://api.whatsapp.com/send/?phone=79992099988&text&app_absent=0"><i className="fa-brands fa-whatsapp"></i></a></li>
                <li><a href="tel:+79992099988"><i className="fa-solid fa-phone"></i></a></li>
                <li
                    onClick={() => setBurgerMenu(true)}
                ><i className="fa-solid fa-bars"></i></li>
            </ul>
            
        </motion.header>
        </>
        
    )
}