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
      videos: exampleVideoData,
      onDelayedSearch: _.debounce(this.onRequest, 500)
    };
  }
  componentDidMount() {
    // this.onRequest('random');
  }
  onClickHandler(video) {
    this.setState({ video });
  }
  onSearchHandler(event) {
    const keyword = event.target.value;
    this.setState({keyword}, () => this.state.onDelayedSearch(this.state.keyword));
  }
  onRequest(keyword) {
    // https://5f8f5b14693e730016d7aff7.mockapi.io/users
    $.get(`${BASE_URL}${keyword}${EMBEDDABLE}${YOUTUBE_API_KEY}`, (data) => this.setState({videos: data.items}));

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
            <VideoList click={this.onClickHandler.bind(this)} videos={this.state.videos || []} />
          </div>
        </div>
      </div >
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
