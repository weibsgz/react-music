
import React ,{Component} from 'react'
import {NavLink} from 'react-router-dom'

class Tab extends Component{    
    render(){
        return (
               <div className="tab">
         
                  <div>
                   <NavLink to='/recommend'  activeClassName="selected">
                        推荐
                   </NavLink>
                   <NavLink to='/singer'  activeClassName="selected">
                        歌手
                    </NavLink>
                     <NavLink to='/rank'  activeClassName="selected">
                        排名
                    </NavLink>
                     <NavLink to='/search'  activeClassName="selected">
                        搜索
                    </NavLink>
                  </div>
    
               </div>
        )
    }
}

export default Tab
