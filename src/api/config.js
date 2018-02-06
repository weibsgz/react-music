

export const TIMEOUT = 3000

export const STATUS = 'status'    // 后台返回的状态码，如 code status 这些

export const baseURL = {
  dev: 'http://localhost:3000/',
  //prod: 'http://202.106.10.250:8877/'
  prod: '/'
}


export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const options = {
  param: 'jsonpCallback'
}

export const ERR_OK = 0
