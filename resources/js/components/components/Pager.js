import React, {Component} from 'react';

class Pager extends Component {

  render() {
    return (
      <React.Fragment>
        <nav className="Page navigation mt-3">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a onClick={this.props.prev} className="page-link" href="#">Newer</a>
            </li>
            <li className="page-item">
              <a onClick={this.props.next} className="page-link" href="#">Older</a>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default Pager;