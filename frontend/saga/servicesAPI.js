import axios from "axios";
import {API_URL} from "../env"

export const getMainServicesAPI = () => {
    return axios
      .get(API_URL + "/services/")
      .then(response => response.data)
    }

export const getDetailServiceAPI=(slug) => {
  return axios
    .get(API_URL + `/services/${slug}`)
    .then(response => response.data)
  }