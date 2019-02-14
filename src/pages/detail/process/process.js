import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import off from '../../../images/icon/off.png'
import './process.less'

export default class Process extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { value, number } = this.props
    return (
      <View class="process__line">
        <View class="process__stars">
          {
            [0, 1, 2, 3, 4].map(item => {
              return (
                (number + 1 > item) ? <Image src={off} key={item}/> : ''
              )
            })
          }
        </View>
        <View class="process__item">
          <View class="process__active" style="width:{{value*100}}%" />
        </View>
      </View>
    )
  }
}