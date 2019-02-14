import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import Poster from '../../../components/poster/poster'
import arrowRightPink from '../../../images/icon/arrow-right-pink.png'
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
    return (
      <View class='movie__block' key={item.id}>
        <View class='block__bar'>
          <Text class='bar__title'>{item.subject_collection.name}</Text>
          <View class='bar__more'>
            <Text class='more__text' onClick={this.tapMore.bind(this, item.subject_collection.id)}>查看更多</Text>
            <Image class='more__icon' src={arrowRightPink} />
          </View>
        </View>
        <ScrollView scroll-x="{{true}}" class='block__scroll'>
          <View class='scroll__row'>
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
      </View>
    )
  }
}