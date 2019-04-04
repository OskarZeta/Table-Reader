import React, { Component } from 'react';
import sortData from '../utils/sort_data';
import searchData from '../utils/search_data';
import Search from './Search';
import Table from './Table';
import Pagination from './Pagination';
import Info from './Info';

const ENTRIES_PER_PAGE = 50;

class App extends Component {
  state = {
    data: this.props.defaultData,
    sort: {
      by: 'id',
      dir: 'asc'
    },
    page: 1,
    info: undefined
  }
  handleSearchClick = substr => {
    if (substr.length) {
      let searchedData = searchData(substr, this.props.defaultData);
      this.setState({
        data: searchedData,
        info: undefined
      });
    }
  }
  handleResetClick = () => {
    this.setState({
      data: this.props.defaultData,
      page: 1,
      info: undefined
    });
  }
  handleSortClick = e => {
    if (e.target.tagName === 'TH') {
      let dir = this.state.sort.dir === 'asc' ? 'desc' : 'asc';
      let type = e.target.dataset.type;
      let data = this.state.data;
      let sortedData = sortData(type, dir, data);
      this.setState({
        data: sortedData,
        sort: {
          by: type,
          dir
        },
        info: undefined
      });
    }
  }
  handlePageChange = page => {
    this.setState({
      page,
      info: undefined
    });
  }
  handleShowInfo = info => {
    this.setState({ info });
  }
  render() {
    return (
      <div>
        <h1>APP</h1>
        <Search
          handleSearchClick={this.handleSearchClick}
          handleResetClick={this.handleResetClick}
        />
        <Table
          data={this.state.data.length >= ENTRIES_PER_PAGE ?
            this.state.data.slice(ENTRIES_PER_PAGE * (this.state.page - 1), ENTRIES_PER_PAGE * this.state.page) :
            this.state.data}
          handleSortClick={this.handleSortClick}
          handleShowInfo={this.handleShowInfo}
          info={this.state.info}
        />
        {this.state.data.length >= ENTRIES_PER_PAGE &&
          <Pagination
            page={this.state.page}
            handlePageChange={this.handlePageChange}
          />
        }
      </div>
    );
  }
}

export default App;
