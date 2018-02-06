/**** React应用依赖组件 ****/
// core
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker';
// Redux 相关
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import combineReducers from './store/combineReducers'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
import 'common/css/index.scss'
/**** 当前组件的 子组件等 ***/
import App from './App'


import 'babel-polyfill'  
import fastclick from 'fastclick'

// fastclick.attach(document.body)
console.log(combineReducers)
const store = createStore(combineReducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : () => {}
))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
