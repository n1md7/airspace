import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Commit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    };

    this.showMore = this
      .showMore
      .bind(this);
  }
  DateDiff($date) {
    let detectDiff = [
      {
        fn: function (d1, d2) {
          let t2 = d2.getTime();
          let t1 = d1.getTime();

          return parseInt((t2 - t1) / (60 * 1000));
        },
        limit: 60,
        name: 'minutes'
      }, {
        fn: function (d1, d2) {
          let t2 = d2.getTime();
          let t1 = d1.getTime();

          return parseInt((t2 - t1) / (3600 * 1000));
        },
        limit: 24,
        name: 'hours'
      }, {
        fn: function (d1, d2) {
          let t2 = d2.getTime();
          let t1 = d1.getTime();

          return parseInt((t2 - t1) / (24 * 3600 * 1000));
        },
        limit: 7,
        name: 'days'
      }, {
        fn: function (d1, d2) {
          let t2 = d2.getTime();
          let t1 = d1.getTime();

          return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
        },
        limit: 31,
        name: 'weeks'
      }, {
        fn: function (d1, d2) {
          let d1Y = d1.getFullYear();
          let d2Y = d2.getFullYear();
          let d1M = d1.getMonth();
          let d2M = d2.getMonth();

          return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
        },
        limit: 12,
        name: 'months'
      }, {
        fn: function (d1, d2) {
          return d2.getFullYear() - d1.getFullYear();
        },
        limit: Number.MAX_SAFE_INTEGER,
        name: 'years'
      }
    ];

    let diff = {
      number: 0,
      name: 'moment'
    };
    for (let i = 0; i < detectDiff.length; i++) {
      let dt = new Date($date);
      diff.number = detectDiff[i]['fn'](dt, new Date());
      diff.name = detectDiff[i]['name'];
      if (diff.number < detectDiff[i]['limit']) {
        break;
      }
    }

    if (diff.number === 0) {
      return diff.name;
    }
    if(diff.number === 1){
      diff.name = diff.name.replace('s', '');
    }


    return diff.number + ' ' + diff.name;
  }

  copyToClipboard(text2copy) {
    let textField = document.createElement('textarea');
    textField.innerText = text2copy;
    document
      .body
      .appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    console.log(text2copy + ' copied');
  }
  showMore() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  openProfile(link) {
    window.open(link, '_blank');
  }

  render() {
    const list = this.props.list;
    const {name, email, date} = list.commit.author;
    const {sha, html_url} = list;
    const avatar_url = list.author
      ? list.author.avatar_url
      : 'https://camo.githubusercontent.com/c14b0fcacbf08cb9f20241ef47b90e12b138ac22/6874' +
        '7470733a2f2f322e67726176617461722e636f6d2f6176617461722f383036303132396136303638' +
          '64356664373438616637643465626662313963333f643d6874747073253341253246253246676974' +
          '6875622e6769746875626173736574732e636f6d253246696d616765732532466772617661746172' +
          '7325324667726176617461722d757365722d3432302e706e6726723d6726733d3430';

    return (
      <div className="row commit">
        <div className="col col-6 col-md-8 commit-cell">
          <div className="col col-12 p-0">
            <p
              className={this.state.isToggleOn
              ? 'read-more'
              : ''}
              onClick={this.showMore}>
              {list.commit.message}
            </p>
          </div>
          <div className="col col-12 p-0">
            <img
              className="avatar"
              width="20"
              height="20"
              src={avatar_url}
              onClick={this
              .openProfile
              .bind({}, !list.committer || list.committer.html_url || '#')}/>
            <b className="username">{name}</b>
            committed {this.DateDiff(date)} {' '}
            ago
          </div>
        </div>
        <div className="col col-6 col-md-4 commit-link-cell">
          <div className="btn-group">
            <a
              href="#"
              onClick={this
              .copyToClipboard
              .bind({}, sha)}
              className="btn btn-sm btn-light text-primary">
              <i className="fa fa-clone" aria-hidden="true"></i>
            </a>
            <a
              href={html_url}
              target="_blank"
              className="btn btn-sm btn-light text-primary">
              {sha.substr(0, 7)}
            </a>
          </div>
          <a
            href={list.commit.tree.url}
            className="btn btn-sm btn-light ml-2 text-primary"
            target="_blank">
            <i className="fa fa-code"></i>
          </a>
        </div>
      </div>
    );
  }
}

Commit.propTypes = {
  list: PropTypes.object.isRequired
};

export default Commit;
