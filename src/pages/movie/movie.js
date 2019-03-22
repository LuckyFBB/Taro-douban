import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { g_requestApi } from '../../globalData'
import { httpBlock, http } from '../../utils/http'
import MovieBlock from './block/block'
import search from '../../images/icon/search.png'
import arrowRightPink from '../../images/icon/arrow-right-pink.png'
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

    Taro.showLoading({
      title: '正在加载'
    })

    const movieBlock = ['movie_showing', 'movie_hot_gaia', 'tv_variety_show', 'tv_hot', 'book_bestseller', 'music_single']
    for (let element of movieBlock) {
      let url = `${g_requestApi}subject_collection/${element}/items?start=0&count=20&apiKey=054022eaeae0b00e0fc068c0c0a2102a`
      http.request(url).then((res) => {
        this.processData(element, res)
      })
    }
  }

  componentDidMount() {
    console.log(this.state)
    Taro.hideLoading()
  }

  tapSearch = () => {
    Taro.navigateTo({
      url: '../search/search'
    })
  }

  tapMore(id, e) {
    console.log(id)
    Taro.navigateTo({
      url: `/pages/more/more?id=${id}`
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
    return (
      <View>
        <View class="search-form">
          <View class="form__view" onClick={this.tapSearch}>
            <Image src={search} />
            <Text>搜索</Text>
          </View>
        </View>
        <View class='movie__block'>
          <View class='block__bar'>
            <Text class='bar__title'>影院热映</Text>
            <View class='bar__more'>
              <Text class='more__text' onClick={this.tapMore.bind(this, subject.movie_showing.subject_collection.id)}>查看更多</Text>
              <Image class='more__icon' src={arrowRightPink} />
            </View>
          </View>
          <MovieBlock item={subject.movie_showing} />
        </View>
        <View class='movie__block'>
          <View class='block__bar'>
            <Text class='bar__title'>豆瓣热映</Text>
            <View class='bar__more'>
              <Text class='more__text' onClick={this.tapMore.bind(this, subject.movie_hot_gaia.subject_collection.id)}>查看更多</Text>
              <Image class='more__icon' src={arrowRightPink} />
            </View>
          </View>
          <MovieBlock item={subject.movie_hot_gaia} />
        </View>
        <View class='movie__block'>
          <View class='block__bar'>
            <Text class='bar__title'>近期热门综艺</Text>
            <View class='bar__more'>
              <Text class='more__text' onClick={this.tapMore.bind(this, subject.tv_variety_show.subject_collection.id)}>查看更多</Text>
              <Image class='more__icon' src={arrowRightPink} />
            </View>
          </View>
          <MovieBlock item={subject.tv_variety_show} />
        </View>
        <View class='movie__block'>
          <View class='block__bar'>
            <Text class='bar__title'>近期热门剧集</Text>
            <View class='bar__more'>
              <Text class='more__text' onClick={this.tapMore.bind(this, subject.tv_hot.subject_collection.id)}>查看更多</Text>
              <Image class='more__icon' src={arrowRightPink} />
            </View>
          </View>
          <MovieBlock item={subject.tv_hot} />
        </View>
        <View class='movie__block'>
          <View class='block__bar'>
            <Text class='bar__title'>畅销图书</Text>
            <View class='bar__more'>
              <Text class='more__text' onClick={this.tapMore.bind(this, subject.book_bestseller.subject_collection.id)}>查看更多</Text>
              <Image class='more__icon' src={arrowRightPink} />
            </View>
          </View>
          <MovieBlock item={subject.book_bestseller} />
        </View>
        <View class='movie__block'>
          <View class='block__bar'>
            <Text class='bar__title'>热门单曲榜</Text>
            <View class='bar__more'>
              <Text class='more__text' onClick={this.tapMore.bind(this, subject.music_single.subject_collection.id)}>查看更多</Text>
              <Image class='more__icon' src={arrowRightPink} />
            </View>
          </View>
          <MovieBlock item={subject.music_single} />
        </View>
      </View >
    )
  }
}