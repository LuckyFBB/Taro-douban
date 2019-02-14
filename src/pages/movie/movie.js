import Taro, { Component } from '@tarojs/taro'
import { View, Form, Input } from '@tarojs/components'
import { g_requestApi } from '../../globalData'
import { httpBlock } from '../../utils/http'
import MovieBlock from './block/block'
import './movie.less'

export default class Movie extends Component {

  config = {
    navigationBarTitleText: '豆瓣评分'
  }
  constructor(props) {
    super(props)
    this.state = {
      subject: {
        movie_showing: {},
        movie_hot_gaia: {},
        tv_variety_show: {},
        tv_hot: {},
        book_bestseller: {},
        music_single: {}
      }
    }
  }

  componentWillMount() {
    const movie_showing = `${g_requestApi}subject_collection/movie_showing/items?start=0&count=20&apiKey=054022eaeae0b00e0fc068c0c0a2102a`
    const movie_hot_gaia = `${g_requestApi}subject_collection/movie_hot_gaia/items?start=0&count=20&apiKey=054022eaeae0b00e0fc068c0c0a2102a`
    const tv_variety_show = `${g_requestApi}subject_collection/tv_variety_show/items?start=0&count=20&apiKey=054022eaeae0b00e0fc068c0c0a2102a`
    const tv_hot = `${g_requestApi}subject_collection/tv_hot/items?start=0&count=20&apiKey=054022eaeae0b00e0fc068c0c0a2102a`
    const book_bestseller = `${g_requestApi}subject_collection/book_bestseller/items?start=0&count=20&apiKey=054022eaeae0b00e0fc068c0c0a2102a`
    const music_single = `${g_requestApi}subject_collection/music_single/items?start=0&count=20&apiKey=054022eaeae0b00e0fc068c0c0a2102a`

    httpBlock(movie_showing, 'movie_showing', this.processData)
    httpBlock(movie_hot_gaia, 'movie_hot_gaia', this.processData)
    httpBlock(tv_variety_show, 'tv_variety_show', this.processData)
    httpBlock(tv_hot, 'tv_hot', this.processData)
    httpBlock(book_bestseller, 'book_bestseller', this.processData)
    httpBlock(music_single, 'music_single', this.processData)
    Taro.showLoading({
      title:'正在加载'
    })
  }

  componentDidMount() {
    console.log(this.state)
    Taro.hideLoading()
  }

  tapSearch = () => {
    Taro.navigateTo({
      url:'../search/search'
    })
  }

  //回调赋值
  processData = (key, data) => {
    this.state.subject[key] = data
    this.setState({
      subject: this.state.subject
    })
  }

  render() {
    const { subject } = this.state
    const subjectArr = Object.values(subject)
    return (
      <View>
        <Form bindsubmit="formSubmit">
          <View class="search-form">
            <Input type="text" placeholder='搜索' class="form__input" confirm-type='search' onFocus={this.tapSearch} />
          </View>
        </Form>
        {
          subjectArr.map((item, index) => {
            return (
              <MovieBlock item={item} key={index} />
            )
          })
        }
      </View >
    )
  }
}

