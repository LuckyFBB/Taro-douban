import Taro, { Component } from "@tarojs/taro";

export default class ListTop extends Component {
  render() {
    const { item } = this.props
    let background = {
      background: `url(${item.header_bg_image}) no-repeat center`
    }
    let poster = item.items.slice(0, 3)
    return (
      <View style={background} class='top__item' key={item.id}>
        <Text class='item__name'>{item.name}</Text>
        <View class='item__show'>
          <View class='show__image'>
            {
              poster.map((pic, index) => {
                return <Image src={pic.pic.normal} style={`z-index:${6 - index}`} key={index} />
              })
            }
          </View>
        </View>
      </View>
    )
  }
}