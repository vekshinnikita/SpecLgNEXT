import React, { useEffect,  useState} from 'react';
import { makeOrderAPI } from '../utils/api';
import { callAlert } from './Alert';


export function useWindowDimensions() {
  if (typeof window !== 'undefined') {
    // detect window screen width function
  
    const [width, setWidth] = useState(window.innerWidth);
  
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };
  
    useEffect(() => {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    });
  
    return width
  }
  return NaN
  }

export const makeOrderFunc = async (values, dispatch) => {
  try {
      await makeOrderAPI(values)
      callAlert("success",'Заявка отправлена успешно', dispatch)

  }catch (error) {
      callAlert("error",'Упс... Что-то пошло не так', dispatch)
      console.log(error)
  }  
  

}   