import React, { Component } from "react";
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'
class Slider extends Component {
    constructor() {
        super();
        this.state = {
            dots:[],
            currentPageIndex: 0
        };
        this._setSliderWidth = this._setSliderWidth.bind(this)
    }

    componentDidMount() {
        setTimeout(() => {
            this._setSliderWidth();
            this._initSlider();
            this._initDots()

            if (this.props.autoPlay) {
                this._play()
            }
            let me = this;
            window.addEventListener('resize', () => {
              if (!me.slider) {
                return
              }
              me.slider.refresh()
            })
        }, 1000)
    }

    componentWillUnmount() {
       
        clearTimeout(this.timer)
    }

    _setSliderWidth() {
        //取得所有HTMLCollection 5个a标签
        let childrenList = this.refs.sliderGroup.children;
        let width = 0;       
        let sliderWidth = this.refs.slider.clientWidth;
        
        for(let i = 0; i < childrenList.length; i++) {

          let child = childrenList[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
  
        }
        
        if (this.props.loop) {
          width += 2 * sliderWidth
        }
        this.refs.sliderGroup.style.width = width + 'px'
      }

    _initSlider() {
         this.slider = new BScroll(this.refs.slider, {
              scrollX: true,
              momentum: false,
              snap: {
                loop: this.props.loop,
                threshold: 0.3,
                speed: 400
              },
              click: this.click
            })
            this.slider.on('scrollEnd', ()=>{
                let pageIndex = this.slider.getCurrentPage().pageX;
                if(this.props.loop){
                    pageIndex -=1;
                }
                this.setState({
                  currentPageIndex: pageIndex
                })
            })
            this.slider.on('touchend', () => {
              if (this.autoPlay) {
                this._play()
              }
            })
            this.slider.on('beforeScrollStart', () => {
              if (this.autoPlay) {
                clearTimeout(this.timer)
              }
            })
    }

    _initDots() {
        console.log('initDots',)
        
        let childrenList = this.refs.sliderGroup.children;
        this.setState({
         dots: Array.from(childrenList).fill('', 0, childrenList.length)
          //dots:new Array(this.children.lenth)
        })
    }

      _play() {
        clearInterval(this.timer)
        let me = this;
        this.timer = setInterval(() => {
            me.slider.next()
        }, this.props.interval)
      }
    render() {

        const dots = this.state.dots.map((v,i)=>
            <span className={i===this.state.currentPageIndex?'dot active':'dot'}  key={i}>{v}</span>
        )

        return (
            <div className="slider" ref="slider">
                <div className="slider-group" ref="sliderGroup">
                    {this.props.children}
                </div>
                <div className="dots" >
                    {dots}
                </div>
            </div>
        );
    }
}

export default Slider
