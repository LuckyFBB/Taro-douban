import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import Star from '../../../components/star/star';
import like from '../../../images/icon/like.png'
import './interest.less'

export default class Interest extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { interest } = this.props
    return (
      <View class="interests__item">
        <View class="interests__user">
          <View class="user__avatar">
            <Image src={interest.user.avatar} />
          </View>
          <View class="interests__right">
            <Text class="right__name">{interest.user.name}</Text>
            <View class="right__rating">
              <Star value={interest.rating.value} max={interest.rating.max}/>
            </View>
          </View>
        </View>
        <View class="interests__comment">{interest.comment}</View>
        <View class="interests__vote">
          <Image src={like} class="vote__img" />
          <Text class="vote__count">{interest.vote_count}</Text>
        </View>
      </View>
    )
  }
}