const domain = process.env.NODE_ENV === 'production' ? 'speclg.ru' : '127.0.0.1:8000'
const protocol = process.env.NODE_ENV === 'production' ? 'https://' : 'http://'
const domainServer = process.env.NODE_ENV === 'production' ? 'backend:8000' : '127.0.0.1:8000'

export const API_URL_SERVER = 'http://' + domainServer + '/api' 

export const API_URL = protocol + domain + '/api'