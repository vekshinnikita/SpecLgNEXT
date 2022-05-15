import React from 'react'


export default () => {

    return(
        <footer id="contacts" className="services-section footer text-center" style={{backgroundColor: "#202020"}}>
            <div>
                <h2 className="backgroud-text" style={{color: "#252927"}} >КОНТАКТЫ</h2>
                <h3>Свяжитесь с нами любым удобным способом!</h3>
                <div className="contanct-row">
                    <div className="contact-item">
                        <img src="/static/todo-list.svg" />
                        <p>+7-999-209-99-88</p>
                    </div>
                    <div className="contact-item">
                        <img src="/static/mail.svg" />
                        <p>Запрос онлайн</p>
                    </div>
                    <div className="contact-item">
                        <img src="/static/phone.svg" />
                        <p>Info@spec-lg.ru</p>
                    </div>
                    <div className="contact-item">
                        <img src="/static/whats-up.svg" />
                        <p>+7-999-209-99-88</p>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="footer-links">
                <div className="footer-link-item">
                    <h2 className='footer-logo'>СПЕЦЛОГИСТИКА</h2>
                    <p>Санкт-Петербург</p>
                    <p>Пр. Обуховской обороны 112</p>
                    <p>к.2 литера З, офис 210А</p>

                    <div className='footer-phone'>+7-999-209-99-88</div><br/>
                    <div className='footer-whatsup'><i className="fa-brands fa-whatsapp"></i></div>
                </div>
                <div className='footer-block-desktop'></div>
                <div className='footer-block-desktop'></div>
                {/* <div className="footer-link-item">
                    <h2>УСЛУГИ</h2>
                    <ul>
                        <li><a href="#">Перевозка крупных партий</a></li>
                        <li><a href="#">Негабаритные перевозки</a></li>
                        <li><a href="#">Догруз в машину</a></li>
                        <li><a href="#">Сборный груз</a></li>
                        <li><a href="#">Рефрижераторные перевозки</a></li>
                        <li><a href="#">Перевозка контейнера</a></li>
                        <li><a href="#">Отдельная машина</a></li>
                        <li><a href="#">Домашний переезд</a></li>
                        <li><a href="#">Переезд/перевозка с возмещением</a></li>
                        <li><a href="#">Ж/Д перевозки</a></li>
                    </ul>
                </div> */}
                
                <div className="footer-link-item">
                    <h2>ДОКУМЕНТЫ</h2>
                    <ul>
                        <li><a href="#">Бланк Договор юр-лица</a></li>
                        <li><a href="#">Бланк Договор физ.лица</a></li>
                        <li><a href="#">Бланк Опись груза</a></li>
                        <li><a href="#">Бланк Заявка на перевозку</a></li>
                        <li><a href="#">Бланк ТТН</a></li>
                        <li><a href="#">Бланк CMR</a></li>
                        <li><a href="#">Блок 6</a></li>
                        
                    </ul>
                </div>
            </div>
        </footer>
    )
}