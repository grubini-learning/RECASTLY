var Search = (props) => {
  return (
    <div className="search-bar form-inline">
      <input className="form-control" onChange={props.input} value={props.keyword} type="text" />
      <button className="btn hidden-sm-down" onClick={props.click}>
        <span className="glyphicon glyphicon-search"></span>
      </button>
    </div>
  );
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default Search;
