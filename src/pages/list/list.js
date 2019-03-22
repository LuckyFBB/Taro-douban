import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from '@tarojs/components'
import { http } from '../../utils/http'
import ListTop from '../../components/list-top/list-top'
import './list.less'
import ListBottom from "../../components/list-bottom/list-bottom";

export default class List extends Component {
  constructor() {
    this.state = {
      topMovie: null,
      bottomMovie: null,
      book: null
    }
  }

  componentWillMount() {
    Taro.showLoading({
      title: '正在加载'
    })
    http.request('https://frodo.douban.com/api/v2/movie/rank_list?apiKey=054022eaeae0b00e0fc068c0c0a2102a')
      .then(res => {
        this.setState({
          topMovie: res.selected_collections.slice(0, 2),
          bottomMovie: res.selected_collections.slice(2)
        })
      }).then(() => {
        http.request('https://frodo.douban.com/api/v2/book/rank_list?apiKey=054022eaeae0b00e0fc068c0c0a2102a')
          .then(res => {
            this.setState({
              bottomMovie: this.state.bottomMovie.concat(res.selected_collections)
            })
          })
      }).then(()=>{
        Taro.hideLoading()
      })
  }

  render() {
    const { bottomMovie, topMovie } = this.state
    return (
      < View class='list__container' >
        <View class='list__top'>
          {
            topMovie.map(item => {
              return <ListTop item={item} key={item.id} />
            })
          }
        </View>
        <View class='list__bottom'>
          {
            bottomMovie.map(item => {
              return <ListBottom item={item} key={item.id} />
            })
          }
        </View>
      </View >
    )
  }
}