/*
 * @Author: FBB
 * @Date: 2019-02-14 14:28:22
 * @LastEditors: FBB
 * @LastEditTime: 2019-08-20 21:52:54
 */
import Taro, { Component } from '@tarojs/taro'
import Movie from './pages/movie'

import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/movie/movie',
      'pages/more/more',
      'pages/detail/detail',
      'pages/search/search',
      'pages/list/list',
      'pages/mine/mine'
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#f1a3c7",
      navigationBarTitleText: "豆瓣评分",
      navigationBarTextStyle: "white"
    },
    tabBar: {
      list: [
        {
          pagePath: "pages/movie/movie",
          text: "电影",
          iconPath: "./images/icon/movie.png",
          selectedIconPath: "./images/icon/movie-active.png"
        },
        {
          pagePath: "pages/list/list",
          text: "榜单",
          iconPath: "./images/icon/list.png",
          selectedIconPath: "./images/icon/list-active.png"
        },
        {
          pagePath: "pages/mine/mine",
          text: "我的",
          iconPath: "./images/icon/mine.png",
          selectedIconPath: "./images/icon/mine-active.png"
        }
      ],
      borderStyle: "black",
      selectedColor: "#f1a3c7"
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Movie />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
