import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import Poster from '../../../components/poster/poster'
import arrowRightPink from '../../../images/icon/arrow-right-pink.png'
import defaultImg from '../../../images/default.png'
import './block.less'

export default class MovieBlock extends Component {
  constructor(props) {
    super(props)
  }

  tapMore(id, e) {
    e.stopPropagation()
    console.log(id)
    Taro.navigateTo({
      url: `/pages/more/more?id=${id}`
    })
  }

  render() {
    const { item } = this.props
    const style = {
      height: '220rpx',
      width: '600rpx'
    }
    return (
      <ScrollView scroll-x="{{true}}" class='block__scroll'>
        <View class='scroll__row'>
          <Image src={defaultImg} style={style} />
          <View class='row__poster'>
            {
              item.subject_collection_items.map((poster) => {
                return (
                  <Poster poster={poster} key={poster.id} pic={poster.cover.url} />
                )
              })
            }
          </View>
        </View>
      </ScrollView>
    )
  }
}