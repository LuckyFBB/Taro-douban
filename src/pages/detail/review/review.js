import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import Star from '../../../components/star/star';
import './review.less'

export default class Review extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { review } = this.props
    return (
      <View class="reviews__item">
        <View class="item__user">
          <View class="user__avatar">
            <Image src={review.user.avatar} />
          </View>
          <View class="user__name">{review.user.name}看过</View>
          <View class="user__rating">
            <Star value={review.rating.value} max={review.rating.max} />
          </View>
        </View>
        <View class="item__content">
          <View class="content__title">{review.title}</View>
          <View class="content__abstract">{review.abstract}</View>
          <Text class="content__other">{review.comments_count}回复 · {review.reactions_count}有用 · {review.reshares_count}转发</Text>
        </View>
      </View>
    )
  }
}