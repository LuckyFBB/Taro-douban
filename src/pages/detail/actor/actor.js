import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './actor.less'

export default class Actor extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { actor } = this.props
    return (
      <View class="actor__item">
        <Image src={actor.cover_url} />
        <Text class="actor__name">{actor.name}</Text>
        <Text class="actor__career">{actor.roles[0]}</Text>
      </View>
    )
  }
}