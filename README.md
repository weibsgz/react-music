### slot 
类似于VUE的slot插槽,react用this.props.children

```
 const silderList = this.state.recommend.map(v=>{...})
 
 <Slider interval='2000' autoPlay={true} loop={true}>
    {sliderList}
 </Slider>

```

子组件中 slider.js
```
<div className="slider-group" ref="sliderGroup">
      {this.props.children}
</div>

```


### watch 监测从父组件传递过来的数据变化 
父组件
```
  <ScrollWrapper data={this.state.discList}>
  </ScrollWrapper>

```

子组件
```
   componentWillReceiveProps(nextProps){
       if (nextProps.data !== this.props.data) {
            console.log('123123')
            this.refresh()
            console.log(this.refs.ScrollWrapper.clientHeight)
       }
    }

```

以下也可以实现watch 执行函数 是否render()刷新

```
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


```


### 子路由
子组件中 调用父组件的select方法 传递item
```
  setSinger(item){
        this.props.select(item)
  }

 <li key={item.id} className="list-group-item"
                            onClick={this.setSinger.bind(this,item)}
                        >
                           ...
 </li>     
```


父组件
```
selectSinger(item){
    this.props.history.push(`/singer/${item.id}`)
}

<Route path={`/singer/:id`} component={SingerDetail}>
                    </Route>
```
