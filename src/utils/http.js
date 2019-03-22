import Taro from '@tarojs/taro'

class Http {
  request(url) {
    let promise = new Promise((resolve, reject) => {
      Taro.request({
        url: url,
        method: 'GET',
        header: {
          "Content-Type": "json"
        },
        success: function (res) {
          resolve(res.data)
        },
        error: function (error) {
          reject(error)
        }
      })
    })
    return promise
  }
}

export const http = new Http()