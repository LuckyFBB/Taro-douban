import Taro, { Component } from '@tarojs/taro'
import { httpMore } from '../../utils/http'
import { g_requestApi } from '../../globalData'
import { ScrollView, View } from '@tarojs/components'
import Poster from '../../components/poster/poster'
import './more.less'

export default class More extends Component {

  config = {
    navigationBarTitleText: `豆瓣评分`
  }

  constructor(props) {
    super(props)
    this.setState({
      id: this.$router.params.id,
      subject_collection_items: [],
      pageSize: 0,//存放已经加载的数据个数
      page: 0     //存放加载次数
    })
  }
  componentWillMount() {
    const id = this.$router.params.id
    const moreUrl = `${g_requestApi}subject_collection/${id}/items?start=0&count=20&apiKey=054022eaeae0b00e0fc068c0c0a2102a`
    httpMore(moreUrl, this.processData)
    Taro.showLoading({
      title:'正在加载'
    })
  }

  componentDidMount(){
    Taro.hideLoading()
  }
  
  //加载更多
  loadMore = () => {
    let moreUrl = `${g_requestApi}subject_collection/${this.state.id}/items?start=${this.state.pageSize}&count=20&apiKey=054022eaeae0b00e0fc068c0c0a2102a`
    console.log('加载更多')
    httpMore(moreUrl, this.processData)
  }

  //防抖函数
  debounce = (func, wait = 100) => {
    let timeout;
    return function (event) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func(event)
      }, wait)
    }
  }

  handleLoadMore = this.debounce(this.loadMore)

  processData = (data) => {
    let page = this.state.page + 1
    let pageSize = this.state.pageSize + 20
    if (this.state.page === 0) {
      this.setState({
        subject_collection_items: data.subject_collection_items,
        total: data.total,
        page: page,
        pageSize: pageSize
      })
    } else if (this.state.pageSize < this.state.total) {
      let subject_collection_items = this.state.subject_collection_items.concat(data.subject_collection_items)
      this.setState({
        subject_collection_items: subject_collection_items,
        page: page,
        pageSize: pageSize
      })
    } else {
      Taro.showToast({
        title: '没有更多数据'
      })
    }
  }

  render() {
    const { subject_collection_items } = this.state
    return (
      <ScrollView class='more__container' scroll-y={true} onScrollToLower={this.handleLoadMore}>
        {
          subject_collection_items.map(item => {
            return (
              <View class='more__poster' key={item.id}>
                <Poster poster={item} pic={item.cover.url} />
              </View>)
          })
        }
      </ScrollView >
    )
  }
}