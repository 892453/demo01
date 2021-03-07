import React, { Component } from 'react'
import Home from './pages/home'             //首页
import Login from './pages/login'            //登录
import Register from './pages/register'     //注册
import Findpass from './pages/findpass'     //找回密码
import Test from './pages/test'     //找回密码
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login/" exact component={Login} />
          <Route path="/register/" exact component={Register} />
          <Route path="/findpass/" exact component={Findpass} />
          <Route path="/test/" exact component={Test} />
        </Switch>
      </Router>
    )
  }
}

export default App;
