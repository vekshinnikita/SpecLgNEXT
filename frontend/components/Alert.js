import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../state/slices/components'

export default function Alert(){

    const dispatch = useDispatch()
    const alert = useSelector(state => state.components)
    

    return(
            <div className="alert" style={alert.typeAlert === 'success' ? {backgroundColor: '#049a67'} : {}}>
                <div className="btn-close-alert" style={{color: '#fff'}} onClick={() => dispatch(hideAlert())}><i className="fa-solid fa-x"></i></div>
                {alert.detailAlert}
            </div>
    )
}