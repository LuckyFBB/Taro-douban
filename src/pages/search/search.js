import Taro, { Component } from '@tarojs/taro'
import { g_requestApi } from '../../globalData'
import { View, Input } from "@tarojs/components"
import SearchItem from './searchItem/searchItem';
import './search.less'

export default class Search extends Component {
  constructor(props) {
    super(props)
  }

  tapSearch = (event) => {
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
  render() {
    const { searchData } = this.state
    return (
      <View class="search__container">
        <View class="search__form">
          <Input type="text" placeholder='搜索' class="form__input" confirm-type='search' focus={true} onConfirm={this.tapSearch} />
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