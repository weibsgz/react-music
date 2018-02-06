import React ,{Component} from 'react'
import { getSingerList } from "api/singerApi";
import { ERR_OK } from "api/config";
import SingerTrans from 'common/js/singer'
import ListView from 'component/listview/listview'
import {Route} from "react-router-dom";
//子路由
import SingerDetail from 'pages/singer-detail'

//redux
import { connect } from 'react-redux'
import { setSinger } from 'store/reducers'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

@connect(
    state => state, 
    { setSinger }
)



class Singer extends Component{  
    constructor(){
        super()
        this.state = {
            singers:[]
        }

        this.selectSinger = this.selectSinger.bind(this)
    }  
    componentDidMount(){
        this.getSingerList();
      
    }
    getSingerList(){
        getSingerList().then(res=>{
            if (res.code === ERR_OK){
                this.setState({
                    singers:this._normalizeSinger(res.data.list)
                })
            }
        })
    }
    _normalizeSinger(list){
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }

        list.forEach((item,index)=>{
            if(index<HOT_SINGER_LEN){
                map.hot.items.push(new SingerTrans({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name                 
                }))
            }

            const key = item.Findex;
            if(!map[key]){
                map[key]= {
                    title:key,
                    items:[]
                }
            }
            map[key].items.push(new SingerTrans({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name                 
            }))

        })

        let hot = [];
        let ret = [];
        for(let key in map){
          let val = map[key]
          console.log(val)
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }

        //排序 A,B,C,D...
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
          //console.log(JSON.stringify(hot.concat(ret)))
        return hot.concat(ret)
    }

    selectSinger(item){
        console.log('this.props',this.props)
        this.props.history.push(`/singer/${item.id}`)
        //redux 
        this.props.setSinger(item)
    }


    render(){
        console.log('this.props',this.props)
        return (
               <div className="singer">
                    <ListView data={this.state.singers} select={this.selectSinger}/>
                  
                    
               </div>
        )
    }
}

export default Singer
