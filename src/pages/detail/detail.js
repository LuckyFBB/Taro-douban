import Taro, { Component } from '@tarojs/taro'
import { http } from '../../utils/http'
import { g_requestApi } from '../../globalData'
import { View, Image, Text, Block } from '@tarojs/components'
import Star from '../../components/star/star';
import Process from './process/process';
import Actor from './actor/actor';
import Interest from './interest/interest'
import Poster from '../../components/poster/poster';
import Review from './review/review';
import want from '../../images/icon/want.png'
import see from '../../images/icon/see.png'
import arrowRight from '../../images/icon/arrow-right.png'
import './detail.less'

export default class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      otherInfo: {
        rating: {},
        trailers: {},
        interests: {},
        recommendations: {},
        reviews: {},
        photos: {},
        type: this.$router.params.type
      },
      showIntro: false
    }
  }

  componentWillMount() {
    Taro.showLoading({
      title: '正在加载'
    })
    let _this = this
    const id = this.$router.params.id
    const type = this.$router.params.type
    Taro.request({
      url: `${g_requestApi}${type}/${id}?apiKey=054022eaeae0b00e0fc068c0c0a2102a`,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        const data = res.data
        let title = ''
        if (data.title.length >= 8) {
          title = data.title
        } else if (data.year) {
          title = `${data.title} (${data.year})`
        } else {
          title = data.title
        }
        let summary = ''
        let recommend = ''
        let review = ''
        if (type === 'movie') {
          recommend = '喜欢该部电影的人也喜欢'
          review = '影评'
          summary = `${data.genres.join(' ')} / ${data.countries.join(' ')} / ${data.release_date}上映 / 片长${data.durations.join(' ')}`
        } else if (type === 'book') {
          recommend = '喜欢该本书的人也喜欢'
          review = '书评'
          summary = `${data.author} / ${data.press} / 出版时间: ${data.pubdate}`
        } else if (type === 'music') {
          recommend = '喜欢该张唱片的人也喜欢'
          review = '乐评'
          summary = `${data.genres.join(' ')} / ${data.card_subtitle.split('/')[0]} / ${data.pubdate}`
        } else {
          recommend = '喜欢该电影的人也喜欢'
          review = '影评'
          summary = `${data.genres.join(' ')} / ${data.countries.join(' ')} / ${data.release_date}首映 / ${data.episodes_count}集 / 单集片长${data.durations}`
        }
        _this.setState({
          itemDetail: data,
          summary: summary,
          recommend: recommend,
          review: review,
          title: title,
          pageBackgroundColor: `#${data.body_bg_color}`
        })
        Taro.setNavigationBarTitle({
          title: data.title,
        })
      }
    })
    const detail = ['rating', 'interests', 'recommendations', 'reviews'];
    for (let ele of detail) {
      let url = `${g_requestApi}${type}/${id}/${ele}?apiKey=054022eaeae0b00e0fc068c0c0a2102a`
      http.request(url).then((res) => {
        this.processData(ele, res)
      })
    }
    if (type === 'movie' || type === 'tv') {
      for (let ele of ['trailers', 'photos']) {
        let url = `${g_requestApi}${type}/${id}/${ele}?apiKey=054022eaeae0b00e0fc068c0c0a2102a`
        http.request(url).then((res) => {
          this.processData(ele, res)
        })
      }
    }
  }

  componentDidMount() {
    console.log(this.state)
    Taro.hideLoading()
  }

  debounce = (func, wait = 1000) => {
    let timeout;
    return function (event) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func(event)
      }, wait)
    }
  }

  handleChange = this.debounce((e) => {
    console.log(e.type)
    console.log(this)
  })

  showIntro = () => {
    this.setState({
      showIntro: !this.state.showIntro
    })
  }

  //回调赋值
  processData = (key, data) => {
    this.state.otherInfo[key] = data
    this.setState({
      otherInfo: this.state.otherInfo
    })
  }

  render() {
    const { title, summary, itemDetail, otherInfo, pageBackgroundColor, review, recommend, showIntro } = this.state
    const style = {
      backgroundColor: pageBackgroundColor
    }
    return (
      <View class="detail__container" style={style}>
        <View class="detail__movie">
          <Image class="movie__img" src='{{itemDetail.pic.normal}}' onClick={this.handleChange} />
          <View class="movie__info">
            <Text class="info__title">{title}</Text>
            <Text class="info__desc">{itemDetail.original_title} ({itemDetail.year})</Text>
            <Text class="info__desc">{summary}</Text>
            <View class="movie__action">
              <View class="action__item">
                <Image src={want} class="item__img" />
                <Text class="item__text">想看</Text>
              </View>
              <View class="action__item">
                <Image src={see} class="item__img" />
                <Text class="item__text">看过</Text>
              </View>
            </View>
          </View>
        </View>
        <View class="detail__rating">
          <View class="rating__container">
            <View class="rating__title">
              <Text class="title__text">豆瓣评分™</Text>
              <image src={arrowRight} class="title__img" />
            </View>
            <View class="rating__show">
              <View class="rating__score">
                {
                  itemDetail.rating.value ? (
                    <Block>
                      <Text class="score__text">{itemDetail.rating.value}</Text>
                      <View class="score__star">
                        <Star value={itemDetail.rating.value} max={itemDetail.rating.max} />
                      </View>
                    </Block>
                  ) : (
                      <Text class="score__text--none">暂无评分</Text>
                    )
                }
              </View>
              {
                itemDetail.rating.value ? (
                  <View class="rating__process">
                    {
                      otherInfo.rating.stats.map((item, index) => {
                        return (<Process value={item} number={index} key={index} />)
                      })
                    }
                  </View>
                ) : (
                    <View class="rating__process">
                      {
                        [0, 0, 0, 0, 0].map((item, index) => {
                          return (<Process value={item} number={index} key={index} />)
                        })
                      }
                    </View>
                  )
              }
            </View>
            <View class="rating__comment">
              <Text>{itemDetail.rating.count}人评分</Text>
            </View>
          </View>
        </View>
        {
          itemDetail.intro ? (
            <View class="detail__intro">
              <Text class="intro__title">简介</Text>
              <Text class={showIntro ? 'intro__content' : 'intro__content intro__content--hidden'}>{itemDetail.intro}</Text>
              <Text class="intro__action" onClick={this.showIntro}>{showIntro ? '收起' : '展开'}</Text>
            </View>
          ) : null
        }
        {
          (itemDetail.type === 'movie' || itemDetail.type === 'tv') ? (
            <View class="detail__actor">
              <Text class="actor__title">影人</Text>
              <ScrollView scroll-x='{{true}}' class="actor__scroll">
                <View class="actor__row">
                  {itemDetail.directors.map(item => {
                    return (
                      <View class="actor__card" key={item.id}>
                        <Actor actor={item} />
                      </View>
                    )
                  })
                  }
                  {itemDetail.actors.map(item => {
                    return (
                      <View class="actor__card" key={item.id} >
                        <Actor actor={item} />
                      </View>
                    )
                  })}
                </View>
              </ScrollView>
            </View>
          ) : ''
        }
        {
          ((itemDetail.type === 'movie' || itemDetail.type === 'tv') && otherInfo.photos.total !== 0) ? (
            <View class="detail__trailers">
              <View class="trailers__head">
                <Text class="trailers__title">预告片/剧照</Text>
                <View class="head__count">
                  <Text class="count__text">全部 {otherInfo.photos.total}</Text>
                  <Image src={arrowRight} class="count__img" />
                </View>
              </View>
              <ScrollView scroll-x='{{true}}' class="trailers__scroll">
                <View class="trailers__row">
                  {otherInfo.photos.photos.map(item => {
                    return (
                      <View class="trailers__img" key={item.id}>
                        <Image src={item.image.small.url} mode='scaleToFill' />
                      </View>
                    )
                  })}
                </View>
              </ScrollView>
            </View>
          ) : ''
        }
        <View class="detail__interests">
          <View class="interests__head">
            <text class="head__title">短评</text>
            <View class="head__count">
              <text class="count__text">全部 {otherInfo.interests.total}</text>
              <image src={arrowRight} class="count__img" />
            </View>
          </View>
          <View class="interests__block">
            {
              otherInfo.interests.interests.map(item => {
                return (
                  <Interest interest={item} key={item.id} />
                )
              })
            }
          </View>
          <View class="interests__footer">
            <Text class="footer__text">查看全部短评</Text>
            <Image src={arrowRight} class="footer__img" />
          </View>
        </View>
        <View class="detail__recommendations">
          <Text class="recommendations__title">{recommend}</Text>
          <ScrollView scroll-x={true} class="recommendations__scroll">
            <View class="recommendations__row">
              {
                otherInfo.recommendations ? (
                  otherInfo.recommendations.map(item => {
                    return (<Poster poster={item} pic={item.pic.normal} key={item.id} />)
                  })
                ) : ''
              }
            </View>
          </ScrollView>
        </View>
        <View class="detail__reviews">
          <View class="reviews__head">
            <Text class="reviews__title">{review}</Text>
            <Text class="reviews__count">{otherInfo.reviews.total}条</Text>
          </View>
          {
            otherInfo.reviews.reviews.map(item => {
              return (<Review review={item} key={item.id} />)
            })
          }
        </View>
      </View>
    )
  }
}