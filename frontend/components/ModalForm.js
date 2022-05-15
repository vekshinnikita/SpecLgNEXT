import React, { useState, useEffect } from 'react'
import MuiPhoneNumber from 'material-ui-phone-number';
import { TextField, TextareaAutosize } from '@mui/material';
import array from '../staticInfo/itemOrder'
import { useDispatch, useSelector } from 'react-redux';
import { callAlert } from '../service/Alert';
import { CSSTransition } from 'react-transition-group'
import { hideModal, makeOrder } from '../state/slices/components';
import { makeOrderFunc } from '../service/service';


export default function ModalForm(props){

    const dispatch = useDispatch()
    const components = useSelector(state => state.components)
    const item = array.filter(el => el.id === components.detailModal)[0]
    const [required, setRequired] = useState({
        name: false,
        phone: false,
    })

    useEffect(() => {  
        setValues({
            ...values,
            type: item.type
            });
    }, [item])

    const [values, setValues] = useState({
        type: item.type,
        from: '',
        to: '',
        name: '',
        phone: '',
        comment: '',
    })

    const handleChange = (event) => {
    if (event.target){
        setValues({
        ...values,
        [event.target.name]: event.target.value.trim()
        });
    }
    else{
        setValues({
            ...values,
            ['phone']: event.trim()
            });
    }

    };
    
    const handleSubmit = () =>{
        if ((values.phone.length === 18) && (values.name.length !== 0)){
            makeOrderFunc(values, dispatch)
            setRequired({
                ['name']: false,
                ['phone']: false,
                });
            setValues({
                type: item.type,
                from: '',
                to: '',
                name: '',
                phone: '',
                comment: '',
                });
            
        }else{
            callAlert('error', 'Пожалуйста, заполните все обязательные поля', dispatch)
            let name = false
            let phone = false
            if (values.name.length === 0){
                name = true
            }
            if (values.phone.length != 18){
                phone = true
            }
            setRequired({
                ['name']: name,
                ['phone']: phone,
                });

        }
    }

    return(
        <>
            <div className={components.modal ? 'overlay overlayActive' : 'overlay'}></div>
            <div className={components.modal ? "btn-close btn-close-active" : "btn-close "} onClick={() => dispatch(hideModal())} ><i className="fa-solid fa-x"></i></div>
            <CSSTransition classNames="modal-anim" in={components.modal} timeout={400} unmountOnExit>
                <div className="modal-form-wrapper" onClick={() => dispatch(hideModal())}>
                    <div className="modal-form" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-title">{item.title}</div>
                        <p>{item.paragraph}</p>
                        <div className="castom-input location-input">
                            <TextField placeholder="Откуда" className="inputDiv" value={values.from} variant="standard" name="from"  onChange={handleChange} focused={false}/>
                        </div>
                        <div className="castom-input location-input">
                            <TextField placeholder="Куда" className="inputDiv" value={values.to} variant="standard" name="to" onChange={handleChange}focused={false}/>
                        </div>
                        <div className="castom-input flex" style={required.name ? {border: 'red solid 1px'} : {}}>
                            <TextField placeholder="Ваше имя" className="inputDiv" value={values.name} variant="standard" name="name"  onChange={handleChange} focused={false}/>
                            { required.name && (
                                <div className='required-field'>
                                    Обязательное поле
                                </div>
                            )}
                        </div>
                        <div className="castom-input" style={required.phone ? {border: 'red solid 1px'} : {}}>
                            <MuiPhoneNumber focused={false} defaultCountry={'ru'} value={values.phone} name="phone"  onChange={handleChange} disableAreaCodes={true}/>
                            { required.phone && (
                                <div className='required-field'>
                                    Обязательное поле
                                </div>
                            )}
                        </div>
                    
                        <TextareaAutosize
                            value={values.comment}
                            name="comment"
                            onChange={handleChange}
                            maxRows={1}
                            placeholder="Комментарии (вес, объём, параметры и описание груза)"
                            style={{ 
                                width: '100%' ,
                                height: 100,
                                maxWidth: '100%', 
                                minWidth: '100%', 
                                border: '1px solid #cdd8d1',
                                fontSize: '1em',
                                fontWeight: 400,
                                boxSizing: 'border-box',
                                padding: '10px 20px',
                            }}
                            />
                        <div className="btn-order mt-15 pt-15 pb-15" onClick={handleSubmit}>РАССЧИТАТЬ</div>
                    </div> 
                </div>
            </CSSTransition>
        </>
    )
}