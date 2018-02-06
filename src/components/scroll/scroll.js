import React, { Component } from "react";
import BScroll from 'better-scroll'

class Scroll extends Component {
    static defaultProps = {
        top: 0,
        probeType: 3,
        click: true,
        data: [],
        listenScroll: false,
        top:''
    }


    componentDidMount() {
        console.log('discData',this.props.data)
        let me = this
        setTimeout(() => {
          me._initScroll()
        }, 20)
        setTimeout(() => {
          me.refresh()
        }, 3000)
    }
    // 用此来作为监听父组件数据变化 重新渲染scroll 才可以滚动
    // shouldComponentUpdate(nextProps,nextState){
    //     console.log(this.props.data)
    // }

    componentWillReceiveProps(nextProps){
       if (nextProps.data !== this.props.data) {
            console.log('123123')
            this.refresh()
            console.log(this.refs.ScrollWrapper.clientHeight)
       }
    }

    _initScroll(){
        let me = this;
        if(!this.refs.ScrollWrapper) return 
         me.scroll = new BScroll(me.refs.ScrollWrapper, {
          probeType: me.props.probeType,
          click: me.props.click
        })

        this.scroll.on('scroll',function(pos){
           me.props.onscroll(pos)
        })

        // if (this.props.listenScroll) {
        //   me.scroll.on("scroll", (pos) => {
        //     me.props.scroll(pos)
        //   })
        // }
        if(this.props.top)
         {
            this.refs.ScrollWrapper.style.top = this.props.top + 'px'
         }
    }

      enable() {
        let me = this
        me.scroll && me.scroll.enable()
      }
      disable() {
        let me = this
        me.scroll && me.scroll.disable()
      }
      refresh() {
        let me = this
        me.scroll && me.scroll.refresh()
      }
      scrollTo(){
        this.scroll && this.scrollTo.apply(this.scroll,arguments)
      }
      scrollToElement(){
        this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
      }

    render(){
        return (
              <div ref="ScrollWrapper" className={this.props.className} >
                    {this.props.children}
              </div>
        )
    }
}


export default Scroll
