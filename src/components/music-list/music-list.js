import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import Scroll from 'component/scroll/scroll'
import SongList from 'component/song-list/song-list'
class MusicList extends Component {

    static defaultProps = {
        bgImage: '',
        songs: [],
        title: ''
      }
    static propTypes = {
        bgImage: propTypes.string.isRequired,
        title: propTypes.string.isRequired,
        songs: propTypes.array.isRequired
      }
    

    constructor(props){
        super(props)
        this.state = {
            bgHeight:'',
        }
    }

    componentDidMount(){
        console.log('ref',this.refs.bgImage.clientHeight)
        // this.refs.list.refs.style.top = `${this.refs.bgImage.clientHeight}px`
        this.setState({
            bgHeight:this.refs.bgImage.clientHeight
        })
    }

    render(){
        return (
            <div className="music-list">
                <div className="back"> 回退 </div>
                <h1 className="title">{this.props.title}</h1>
                <div className="bg-image" style={{'backgroundImage': `url(${this.props.bgImage})`}} ref="bgImage">
                    <div className="filter"></div>
                </div>
                <Scroll
                    data={this.props.songs}
                    className="list"
                    ref="list"
                    top={this.state.bgHeight}
                    onscroll={()=>{}}
                >

                    <div className="song-list-wrapper" >
                        <SongList songs={this.props.songs}>
                        </SongList>
                    </div>
                    
                        
                </Scroll>
            </div>
        )
    }
}

export default MusicList
