import React, { Component } from "react";
import { getSingerList,getSingerDeatil } from "api/singerApi";
import { ERR_OK } from "api/config";
import MusicList from 'component/music-list/music-list'
import {createSong} from 'common/js/song'

//redux
import { connect } from 'react-redux'
@connect(
    state => state, 
)
class SingerDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            songs:[],
            title: '',
            bgImage: ''
        }
    }
    componentDidMount(){
        this._getDetail();
    }
    _getDetail(){
        const {singer} = this.props
        if(!singer.id){
            this.props.history.goBack()
            return
        }


        getSingerDeatil(singer.id).then(res=>{
            if(res.code === ERR_OK){
                this.setState({
                    songs:this._normalizeSongs(res.data.list),
                    title: singer.name,
                    bgImage: singer.avatar
                })
            }
            console.log(this.state.songs)
        })
    }
    _normalizeSongs(list){
        let ret = []
        list.forEach(item=>{
            let {musicData} = item
            if (musicData.songid && musicData.albumid) {
                ret.push(createSong(musicData))
            }
        })
        return ret
    }
    render(){
        return (
            <div >
                <MusicList songs={this.state.songs} title={this.state.title} bgImage={this.state.bgImage}></MusicList>
            </div>
        )
    }
}

export default SingerDetail
