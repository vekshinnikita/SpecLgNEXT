import axios from "axios";
import {API_URL} from "../env"

export const makeOrderAPI = (dict) => {
    return axios
      .post(API_URL + "/order/", dict)
      .then(response => response.data)
    }

