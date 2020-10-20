import Search from './Search.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import exampleVideoData from '../data/exampleVideoData.js';
import { BASE_URL, YOUTUBE_API_KEY, EMBEDDABLE } from '../config/youtube.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: {
        id: 'dQw4w9WgXcQ',
        title: 'recast.ly',
        description: 'rolled'
      },
      keyword: '',
      called: false
    };
  }
  onClickHandler(video) {
    this.setState({ video });
  }
  onSearchHandler(event) {
    const keyword = event.target.value;
    this.setState({keyword});
    // data: { order: '-createdAt' },
    // const keyword = event.target.value;
    // // this.setState({ keyword }, () => this.state.times());
    // this.setState({ keyword }, () => {
    //   if (!this.state.called) {
    //     this.setState({called: true});
    //     this.onRequest();
    //   } else {
    //     setTimeout(() => {
    //       this.setState({called: false});
    //     }, 2000);
    //   }
    // });

    // this.setState({ keyword }, () => {
    //   _.debounce(this.onRequest, 300, {
    //     'leading': true,
    //     'trailing': false
    //   });
    // });
  }
  onRequest() {
    // console.log(this.state.keyword);
    $.get(`${BASE_URL}${this.state.keyword}${EMBEDDABLE}${YOUTUBE_API_KEY}`, function(data) {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search click={this.onRequest.bind(this)} keyword={this.state.keyword} input={this.onSearchHandler.bind(this)} />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.video} />
          </div>
          <div className="col-md-5">
            <VideoList click={this.onClickHandler.bind(this)} videos={exampleVideoData} />
          </div>
        </div>
      </div >
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
