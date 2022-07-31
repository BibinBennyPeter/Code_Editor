import React from 'react'

//import VideoItem from './VideoItem';

const Error = () => {

    //  state = {
    //             videos: [],
    //             selectedVideo: null
    //          }
    // const handleSubmit = async (termFromSearchBar) => {
    //     const response = await youtube.get('/search', {
    //         params: {
    //             q: termFromSearchBar
    //         }
    //     })

    //     this.setState({
    //         videos: response.data.items
    //     })
    //     console.log("this is resp",response);
    //     // const handleSubmit = event => {
    //     // event.preventDefault();
    //     // this.handleSubmit(this.state.term);

    // };
    // const handleVideoSelect = (video) => {
    //     this.setState({selectedVideo: video})
    // }



    // //search
    // const handleChange = (event) => {
    //     this.setState({
    //         term: event.target.value
    //     });
    
    // };


    // //detail
    // if(video){
    //     const video = `https://www.youtube.com/embed/${video.id.videoId}`;
    // }





    // //vlist
    // const renderedVideos =  videos.map((video) => {
    //     return <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} />
    //     // console.log(video.id);
    // });

  return (
    <div>
        <div className='ui container' 
        // style={{marginTop: '1em'}}
        >
                {/* xx<SearchBar handleFormSubmit={this.handleSubmit}/> */}
                <div className='search-bar ui segment'>
                <form 
                // onSubmit={handleSubmit(this.state.term)}
                 className='ui form'>
                    <div className='field'>
                        <label htmlFor="video-search">Video Search</label>
                        <input 
                        // onChange={handleChange}
                         name='video-search' type="text" placeholder="Search.."/>
                    </div>
                </form>
                </div>
                <div className='ui grid'>
                    <div className="ui row">
                        <div className="eleven wide column">
                            {/* xx <VideoDetail video={this.state.selectedVideo}/> */}
                            <div className="ui embed">
                                <iframe 
                                // src={videoSrc} 
                                allowFullScreen title="Video player" />
                            </div>
                            <div className="ui segment">
                                <h4 className="ui header">
                                    {/* {video.snippet.title} */}
                                    </h4>
                                <p>
                                    {/* {video.snippet.description} */}
                                    </p>
                            </div>
                        </div>
                        <div className="five wide column">
                            {/* xx <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/> */}
                            <div className='ui relaxed divided list'>
                               {/* {renderedVideos}  */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Error;