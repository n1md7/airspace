import React, {Component} from 'react';
import Commits from './components/Commits';
import Pager from './components/Pager';
import Search from './components/Search';
import axios from 'axios';

class MyApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
      page: 1,
      perPage: 10
    };

    this.onClickNext = this
      .onClickNext
      .bind(this);
    this.onClickPrev = this
      .onClickPrev
      .bind(this);

    this.onPerPageChange = this.onPerPageChange.bind(this);
    this.onSubmitPerPage = this.onSubmitPerPage.bind(this);
  }

  loadData() {
    axios
      .get(`http://localhost:8000/api/commits/${this.state.page}/${this.state.perPage}`)
      .then(response => {
        this.setState({lists: response.data.lists || []});
      });
  }

  componentDidMount() {
    this.loadData();
  }

  onClickNext() {
    this.setState({
      page: ++this.state.page
    });

    this.loadData();
  }
  onClickPrev() {
    let prev = this.state.page - 1 > 0
      ? this.state.page - 1
      : 1;
    this.setState({page: prev});

    this.loadData();
  }

  onPerPageChange(e) {
    this.setState({perPage: e.target.value});
  }

  onSubmitPerPage (e){
    e.preventDefault();
    this.loadData();
  }

  render() {
    return (
      <React.Fragment>
        <h3 className="text-center my-5 text-secondary">
          Airspace task.
          <b>
            <em>
              <code>Git</code>
            </em>
          </b>
          client</h3>
        <Search value={this.state.perPage} submit={this.onSubmitPerPage} perpage={this.onPerPageChange} />
        <div className="commits mt-3">
          <Commits lists={this.state.lists}/>
        </div>
        <Pager prev={this.onClickPrev} next={this.onClickNext} page={this.state.page}/>
      </React.Fragment>
    );
  }
}

export default MyApp;