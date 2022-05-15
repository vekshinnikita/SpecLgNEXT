import axios from "axios";
import {API_URL} from "../env"

export const getListWorkAPI = () => {
    return axios
      .get(API_URL + "/work/")
      .then(response => response.data)
    }
