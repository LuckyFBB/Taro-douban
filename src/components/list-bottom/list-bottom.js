/*
 * @Author: FBB
 * @Date: 2019-03-22 20:53:17
 * @LastEditors: FBB
 * @LastEditTime: 2019-03-22 20:53:17
 */
import { Component } from "@tarojs/taro";
import './list-bottom.less'
  
export default class ListBottom extends Component {
  render() {
    const { item } = this.props
    return (
      <View class='bottom__item' key={item.id}>
        <View class='item__img'>
          <Image src={item.cover_url} mode='aspectFill' style='z-index:3' />
          <Image src={item.header_bg_image} mode='aspectFill' />
        </View>
        <View class='item__movie'>
          {
            item.items.slice(0, 3).map((movie, index) => {
              return (
                <View class='movie__detail' key={movie.id}>
                  <Text class='movie__name'>{index + 1}. {movie.title}</Text>
                  <Text class='movie__rating'>{movie.rating.value}分</Text>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}