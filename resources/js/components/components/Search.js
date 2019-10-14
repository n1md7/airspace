import React, {Component} from 'react';

class Search extends Component {

  render() {
    return (
      <React.Fragment>
        <form>
          <div className="row justify-content-center">
            <div className="col col-12 col-md-6">
              <div className="form-group row">
                <label htmlFor="per-page" className="col-form-label mr-1">Show commits</label>
                <div className="btn-group">
                  <input
                    id="per-page"
                    onChange={this.props.perpage}
                    min="1"
                    max="60"
                    className="form-control input-group-prepend"
                    type="number"
                    value={this.props.value}
                    placeholder="Number of commits per page"/>
                  <a href="#" onClick={this.props.submit} className="btn btn-secondary">
                    <i className="fa fa-edit"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col col-12 col-md-6">
              {/* <input type="search" className="form-control" placeholder="Search here"/> */}
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Search;
