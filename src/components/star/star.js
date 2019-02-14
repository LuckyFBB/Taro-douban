import Taro, { Component } from '@tarojs/taro'
import { Image, Block } from '@tarojs/components'
import './star.less'
import all from '../../images/icon/all.png'
import half from '../../images/icon/half.png'
import off from '../../images/icon/off.png'

export default class Star extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { value, max } = this.props
    return (
      <Block>
        {
          max === 10 ? (
            <View class='ratingbar__stars'>
              {
                [2, 4, 6, 8, 10].map((item, index) => {
                  return (value >= item) ?
                    <Image src={all} key={item} /> :
                    (value / 2 >= index && value % 2 != 0) ?
                      <Image src={half} key={item} /> :
                      <Image src={off} key={item} />
                })
              }
            </View>
          ) : (
              <View class='ratingbar__stars'>
                {
                  [1, 2, 3, 4, 5].map((item) => {
                    return (value >= item) ?
                      <Image src={all} key={item} /> :
                      (value >= item && value < item + 1) ?
                        <Image src={half} key={item} /> :
                        <Image src={off} key={item} />
                  })
                }
              </View>
            )
        }
      </Block>
    )
  }
}