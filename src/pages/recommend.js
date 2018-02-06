import React, { Component } from "react";
import LazyLoad, { forceCheck } from "react-lazyload";
import { getRecommend, getDiscList } from "api/recommendAPI";
import { ERR_OK } from "api/config";

import Slider from "component/slider/slider";
import ScrollWrapper from "component/scroll/scroll";
import Loading from 'component/loading/loading'

class Recommend extends Component {
  constructor() {
    super();
    this.state = {
      recommend: [],
      discList: []
    };
  }
  componentDidMount() {
    this._getRecommend();
    this._getDiscList();
  }
  _getRecommend() {
    getRecommend().then(res => {
      if (res.code === ERR_OK) {
        this.setState({
          recommend: res.data.slider
        });
        this.recommend = this.state.recommend;
      }
    });
  }
  _getDiscList() {
    getDiscList().then(res => {
      if (res.status === 200) {
        this.setState({
          discList: res.data.data.list
        });
      }
    });
  }
  render() {
    const sliderList = this.state.recommend.map((v, i) => (
      <a key={v.id} href={v.linkUrl}>
        <img src={v.picUrl} alt="" />
      </a>
    ));

    const discList = this.state.discList.map((v, i) => (
      <li key={i} className="item">
        <div className="icon">
          <LazyLoad height={60}>
            <img src={v.imgurl} width="60" height="60" />
          </LazyLoad>
        </div>
        <div className="text">
          <h2 className="name">{v.creator.name}</h2>
          <p className="desc">{v.dissname}</p>
        </div>
      </li>
    ));
    console.log("recommend.js render....");
    return (
      <div className="recommend" ref="recommend">
        <ScrollWrapper className="recommend-content" data={this.state.discList} probeType={3}  onscroll={()=>{forceCheck()}}>
          <div>
            <div className="slider-wrapper">
              {/*组件标签开始和结束内的东西都在子组件的props.children上*/}
              <Slider interval="2000" autoPlay={true} loop={true}>
                {sliderList}
              </Slider>
            </div>

            <div className="recommend-list">
              <h1 className="list-title">热门歌单推荐</h1>
              <ul>{discList}</ul>
              { this.state.discList.length == 0 ?  <Loading /> : null }
            </div>
          </div>
        </ScrollWrapper>
      </div>
    );
  }
}

export default Recommend;
