import React, { Component } from "react";
import Scroll from "component/scroll/scroll";
import LazyLoad, { forceCheck } from "react-lazyload";
import { getData } from "common/js/dom";
import Loading from 'component/loading/loading'
import {Link} from "react-router-dom";
const ANCHOR_HEIGHT = 20;

export default class ListView extends Component {
    static defaultProps = {
        data: []
    };
    constructor(props) {
        super(props);
        this.state = {
            shortcutList: [],
            scrollY: -1,
            currentIndex: 0,
            fixedTitle: '热门'
            // diff: -1
        };
        this.touch = {};
        this.listHeight = [];
        this.onShortcutStart = this.onShortcutStart.bind(this);
        this.onShortcutMove = this.onShortcutMove.bind(this);
        this.rollScroll = this.rollScroll.bind(this);
        this._calculateHeight = this._calculateHeight.bind(this);
        this._hightLightCurrent = this._hightLightCurrent.bind(this);
    }
    componentDidMount() {}
    componentWillReceiveProps(nextProps) {
        if (nextProps.length !== 0) {
            let arr = nextProps.data.map(items => {
                return items.title.substr(0, 1);
            });
            this.setState({
                shortcutList: arr
            });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        //观察 父组件传递过来值的变化
        if (this.props.data !== nextProps.data) {
            setTimeout(() => {
                this._calculateHeight();
            }, 20);
            return true;
        }
        //相当于watch 观测state下 scrollY的变化
        if (this.state.scrollY !== nextState.scrollY) {
            // const newY = nextState.scrollY
            // console.log(this._hightLightCurrent(nextProps, nextState))
            return this._hightLightCurrent(nextProps, nextState);           
        }      
        return true;
    }

    onShortcutStart(e) {
        let anchorIndex = getData(e.target, "index");
        let firstTouch = e.touches[0];
        this.touch.y1 = firstTouch.pageY;
        this.touch.anchorIndex = anchorIndex;
        this._scollTo(anchorIndex);
    }

    onShortcutMove(e) {
        // 防止 滑动列表的时候 向上冒泡 歌手列表跟随滑动
        e.stopPropagation();

        let firstTouch = e.touches[0];
        this.touch.y2 = firstTouch.pageY;
        let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0;
        let anchorIndex = delta + parseInt(this.touch.anchorIndex);

        this._scollTo(anchorIndex);
    }

    _scollTo(index) {
        this.refs.listView.scrollToElement(this.refs.listGroup[index], 0);
    }

    rollScroll(pos) {
        this.setState({
            scrollY: pos.y
        });

        forceCheck();
    }

    _calculateHeight() {
        console.log("_calculateHeight");
        this.listHeight = [];
        // const list = Array.from(this.refs.listGroup.children)
        const list = this.refs.listGroup;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            height += item.clientHeight;
            this.listHeight.push(height);
        }
    }

    _hightLightCurrent(nextProps, nextState) {
        const newY = nextState.scrollY;
       
        const listHeight = this.listHeight;
        // 当滚动到顶部， newY > 0
        if (newY > 0) {
            this.setState({ currentIndex: 0 });
            return false;
        }
        // 在中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
            let height1 = listHeight[i];
            let height2 = listHeight[i + 1];
            if (!height2 || (-newY >= height1 && -newY < height2)) {
                this.setState({ diff: height2 + newY });
                this.setState({ currentIndex: i });
                return false;
            }
        }

        // 在底部，且 -newY 大于最后一个元素的上限 第一个减1 是因为 listHeight 多一个 item 的，第二个减一 是因为， currentIndex 是从0 开始的
        this.setState({ currentIndex: listHeight.length - 1 - 1 });
        //console.log(this.state.currentIndex)
        return false;
    }

    setSinger(item){
        this.props.select(item)
    }
    render() {
       // console.log("listView.js render....");
        const listviewData = this.props.data.map((group, index) => (
            <li className="list-group" 
                key={group.title} 
                ref="listGroup"                
                >
                <h2 className="list-group-title">{group.title}</h2>
                <ul>
                    {group.items.map(item => (                        
                        <li key={item.id} className="list-group-item"
                            onClick={this.setSinger.bind(this,item)}
                        >
                            <LazyLoad height={50}>
                                <img className="avatar" src={item.avatar} />
                            </LazyLoad>
                            <span className="name">{item.name}</span>
                        </li>                       
                    ))}
                </ul>
            </li>
        ));
        return (
            <Scroll
                ref="listView"
                className="listView"
                data={this.props.data}
                onscroll={this.rollScroll}
            >
                <ul>{listviewData}</ul>
                <div
                    className="list-shortcut"
                    onTouchStart={this.onShortcutStart}
                    onTouchMove={this.onShortcutMove}
                >
                    <ul>
                        {this.state.shortcutList.length
                            ? this.state.shortcutList.map((item, i) => (
                                  <li className="item" key={i} data-index={i}>
                                      {item}
                                  </li>
                              ))
                            : null}
                    </ul>
                </div>
                {
                    this.props.data.length ? null :
                    <Loading />
                }
            </Scroll>
        );
    }
}
