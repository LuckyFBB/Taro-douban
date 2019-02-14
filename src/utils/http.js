import Taro from '@tarojs/taro'

const httpMore = (url, callBack) => {
  Taro.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

const httpBlock = (url, key, callBack) => {
  Taro.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(key, res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}
export { httpMore, httpBlock }