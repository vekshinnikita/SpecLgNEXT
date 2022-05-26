import axios from "axios";
import { API_URL, API_URL_SERVER} from "../env"

export const getMainServicesAPI = () => {
    return axios
      .get(API_URL_SERVER + "/services/")
      .then(response => response.data)
    }

export const getListWorkAPI = () => {
  return axios
    .get(API_URL_SERVER + "/work/")
    .then(response => response.data)
  }

export const makeOrderAPI = (dict) => {
  return axios
    .post(API_URL + "/order/", dict)
    .then(response => response.data)
  }

export const getDetailServiceAPI=(slug) => {
  return axios
    .get(API_URL + `/services/${slug}`)
    .then(response => response.data)
  }

export const getWorkFilterAPI=(tag) => {
  
  let filter = ''
  if (tag){
    filter = `?tag=${encodeURIComponent(tag)}`
  }

  

  return axios
    .get(API_URL + "/work/list"+ filter)
    .then(response => response.data)
  }

export const getWorkTagsAPI=(tag) => {

  return axios
    .get(API_URL + `/work/tags`)
    .then(response => response.data)
  }