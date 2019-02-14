import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Star from '../star/star';
import './poster.less'

export default class Poster extends Component {
  constructor(props) {
    super(props)
  }

  tapDetail = (type, id, e) => {
    e.stopPropagation()
    console.log(type, id)
    Taro.navigateTo({
      url: `/pages/detail/detail?id=${id}&type=${type}`
    })
  }
  render() {
    const { poster, pic } = this.props
    return (
      <View class="poster__block" onClick={this.tapDetail.bind(this, poster.type, poster.id)}>
        <Image class={poster.type == 'music' ? 'poster__img--music' : 'poster__img'} src={pic} />
        <Text class="poster__name">{poster.title}</Text>
        {
          poster.rating ? (
            <View class="poster__ratingbar">
              <Star value={poster.rating.value} max={poster.rating.max} />
              <Text class='ratingbar__score'>{poster.rating.value.toFixed(1)}</Text>
            </View>
          ) : (
              <View class="poster__ratingbar">
                <Text class='ratingbar__score'>暂无评分</Text>
              </View>
            )
        }
      </View>
    )
  }
}