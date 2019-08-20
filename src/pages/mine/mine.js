/*
 * @Author: FBB
 * @Date: 2019-08-20 21:51:51
 * @LastEditors: FBB
 * @LastEditTime: 2019-08-20 22:08:10
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './movie.less'

export default class Mine extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  constructor() {
    this.state = {
      userInfo: {}
    }
  }

  componentDidMount() {
    const _this = this
    Taro.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          Taro.authorize({
            scope: 'scope.userLocation'
          })
        }
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          Taro.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res.userInfo)
              _this.setState({
                userInfo: res.userInfo
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }

  render() {
    const { userInfo } = this.state
    return (
      <View className='mine'>
        <Image className='mine__head' src={userInfo.avatarUrl} />
        <Text className='mine__name'>{userInfo.nickName}</Text>
        <Text className='mine__intro'>欢迎来到FBB模仿的豆瓣小程序，希望你玩的开心哦</Text>
      </View>
      )
    }
}