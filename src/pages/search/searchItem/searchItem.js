import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import Star from "../../../components/star/star";
import './searchItem.less'

export default class SearchItem extends Component {
  constructor(props) {
    super(props)
  }

  tapDetail(id, type) {
    console.log(id, type)
    Taro.navigateTo({
      url: `/pages/detail/detail?id=${id}&type=${type}`
    })
  }
  
  render() {
    const { search } = this.props
    return (
      <View class="search__item" onClick={this.tapDetail.bind(this, search.id, search.type)}>
        <View class="search__img">
          <Image src={search.pic.normal} />
        </View>
        <View class="search__detail">
          <Text class="search__title">{search.title}</Text>
          <View class="search__rating">
            <Star value={search.rating.value} max={search.rating.max} />
            <Text class="search__Text">{search.rating.value}</Text>
          </View>
          <View class="search__card">{search.card_subtitle}</View>
        </View>
      </View>
    )
  }
}