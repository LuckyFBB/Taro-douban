import Taro, { Component } from '@tarojs/taro'
import { g_requestApi } from '../../globalData'
import { View, Input } from "@tarojs/components"
import SearchItem from './searchItem/searchItem';
import search from '../../images/icon/search.png'
import './search.less'

export default class Search extends Component {
  constructor(props) {
    super(props)
  }

  tapSearch = (event) => {
    console.log('搜索')
    let _this = this
    const value = event.detail.value
    wx.request({
      url: `${g_requestApi}search?q=${value}&apiKey=054022eaeae0b00e0fc068c0c0a2102a`,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        const data = res.data
        _this.setState({
          searchData: data
        })
      }
    })
  }

  //防抖函数
  debounce = (func, wait = 100) => {
    let timeout;
    return function (event) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func(event)
      }, wait)
    }
  }

  handleSearch = this.debounce(this.tapSearch, 1000)

  render() {
    const { searchData } = this.state
    return (
      <View class="search__container">
        <View class="search__form">
          <View class='form__container'>
            <Image src={search} />
            <Input type="text" placeholder='搜索' class="form__input" confirm-type='search' focus={true} onInput={this.handleSearch} />
          </View>
        </View>
        <View class="search-column">
          {
            searchData.subjects.map(item => {
              return (<SearchItem search={item} key={item.id} />)
            })
          }
        </View>
      </View>
    )
  }
}