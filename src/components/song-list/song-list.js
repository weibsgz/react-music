import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

class SongList extends Component {

    static defaultProps = {
        songs:[]
      }
    static propTypes = {
        songs: propTypes.array.isRequired
    }

    constructor(props){
        super(props)
        this.state = {

        }
        this.getDesc = this.getDesc.bind(this);
    }
    getDesc(song){
        return `${song.singer}。${song.album}`
    }

    render(){
        const songList = this.props.songs.map((item,i)=>
            <li className="item" key={item.id}>
                <div className="content">
                    <h2 className="name">{item.name}</h2>
                    <p className="desc">{this.getDesc(item)}</p>
                </div>
            </li>
        )
        return (
            <div className="song-list">
                <ul>{songList}</ul>
            </div>
        )
    }
}

export default SongList
