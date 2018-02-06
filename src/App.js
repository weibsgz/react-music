/**** React应用依赖组件 ****/
// core
import React, { Component } from "react";
// router
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

import HeaderDiv from "component/m-header/m-header.js";
import Tab from "component/tab/tab.js";

import Recommend from "pages/recommend.js";
import Singer from "pages/singer.js";
import Rank from "pages/rank.js";
import Search from "pages/search.js";
import SingerDetail from 'pages/singer-detail'
class App extends Component {
  render() {
    return (
      <div>
        <HeaderDiv />
        <Router>
          <div>
            <Tab />{/* tab 要放到switch外邊否则 重复路由警告，tab里有link也要放在router里边*/}
            <Switch>
              <Redirect exact path="/" to="/recommend" />
              <Route exact path="/recommend" component={Recommend} />
              <Route exact path="/singer" component={Singer} />
              <Route exact path="/rank" component={Rank} />
              <Route exact path="/search" component={Search} />
              {/* 想做子路由 失败了 应该放在singer下*/}
              <Route exact path={`/singer/:id`} component={SingerDetail} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
