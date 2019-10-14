import React, {Component} from 'react';
import Commit from './Commit';
import PropTypes from 'prop-types';

class Commits extends Component {


  render() {
    return this.props.lists.length === 0
      ? <React.Fragment>
          <div className="row">
            <div className="col text-center">{'No commits'}</div>
          </div>
        </React.Fragment>
      : this
        .props
        .lists
        .map(list => (<Commit key={list.sha} list={list}/>));
  }
}

Commits.propTypes = {
  lists: PropTypes.array.isRequired
};

export default Commits;
