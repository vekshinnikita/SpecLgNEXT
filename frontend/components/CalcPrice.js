import React, { useState } from 'react'
import MuiPhoneNumber from 'material-ui-phone-number';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { callAlert } from '../service/Alert';
import { makeOrderFunc } from '../service/service';

export default function CalcPrice() {

    const dispatch = useDispatch()
    const [required, setRequired] = useState({
        name: false,
        phone: false,
    })
    const [values, setValues] = useState({
        from: '',
        to: '',
        weight: '',
        volume: '',
        name: '',
        phone: '',
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
                from: '',
                to: '',
                weight: '',
                volume: '',
                name: '',
                phone: '',
            })
            
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

    return (
        <>
        {/* <div className="calc-price-title">
            Рассчитать стоимость перевозки
        </div> */}
        <div className="calc-price">
            <div className="d-flex">
            <div style={{marginRight: "7.5px"}} className="castom-input location-input">
                <TextField placeholder="Откуда" className="inputDiv" value={values.from} variant="standard" name="from" onChange={handleChange} focused={false}/>
            </div>  

            <div style={{marginLeft: "7.5px"}} className="castom-input location-input">
                <TextField placeholder="Куда" className="inputDiv" value={values.to} variant="standard" name="to" onChange={handleChange} focused={false}/>
            </div>
            </div>
            <div className="d-flex">
                <div style={{marginRight: "7.5px"}} className="castom-input flex weigh-input">
                    <TextField placeholder="Вес" className="inputDiv" value={values.weight} variant="standard" name="weight" onChange={handleChange} focused={false}/>
                </div>
                <div style={{marginLeft: "7.5px"}} className="castom-input flex volume-input">
                    <TextField placeholder="Объём" className="inputDiv" value={values.volume} variant="standard" name="volume" onChange={handleChange} focused={false}/>
                </div>
            </div>
            <div className="castom-input flex" style={required.name ? {border: 'red solid 1px'} : {}}>
                <TextField placeholder="Ваше имя" className="inputDiv" value={values.name} variant="standard" name="name" onChange={handleChange} focused={false}/>
                { required.name && (
                    <div className='required-field'>
                        Обязательное поле
                    </div>
                )}
            </div>
            <div className="castom-input" style={required.phone ? {border: 'red solid 1px'} : {}}>
                <MuiPhoneNumber focused={false} defaultCountry={'ru'} value={values.phone} name="phone" onChange={handleChange} disableAreaCodes={true}/>
                { required.phone && (
                    <div className='required-field'>
                        Обязательное поле
                    </div>
                )}
            </div>
            <p>Отправляя данные, вы даете согласие на обработку персональных данных</p>
        </div>
        <div className="calc-price-button button" onClick={handleSubmit}>
            Рассчитать
        </div>
        </>
    )
}