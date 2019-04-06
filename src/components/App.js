import React, { Component } from 'react';
import sortData from '../utils/sort_data';
import searchData from '../utils/search_data';
import addNewEntry from '../utils/add_new_entry';
import Search from './Search';
import Table from './Table';
import Pagination from './Pagination';
import AddForm from './AddForm';

const ENTRIES_PER_PAGE = 50;

class App extends Component {
  state = {
    data: this.props.defaultData,
    defaultData: this.props.defaultData,
    sort: { by: undefined, dir: undefined },
    page: 1,
    info: undefined,
    toggleForm: false
  }
  handleSearchClick = substr => {
    if (substr.length) {
      let searchedData = searchData(substr, this.state.defaultData);
      this.setState({ data: searchedData, info: undefined });
    }
  }
  handleResetClick = () => {
    this.setState({
      data: this.state.defaultData,
      sort: { by: undefined, dir: undefined },
      page: 1,
      info: undefined
    });
  }
  handleSortClick = e => {
    if (e.target.classList.contains('sort')) {
      let dir = this.state.sort.dir === 'asc' ? 'desc' : 'asc';
      let type = e.target.dataset.type;
      let data = this.state.data;
      let sortedData = sortData(type, dir, data);
      this.setState({
        data: sortedData,
        sort: { by: type, dir },
        info: undefined
      });
    }
  }
  handlePageChange = page => {
    this.setState({ page, info: undefined });
  }
  handleShowInfo = info => {
    this.setState({ info });
  }
  handleAddEntry = entry => {
    let modifiedData = addNewEntry(entry, this.state.defaultData);
    this.setState({
      defaultData: modifiedData,
      data: modifiedData,
      page: 1,
      info: undefined
    });
  }
  toggleAddForm = () => {
    this.setState({ toggleForm: !this.state.toggleForm });
  }
  sliceData = () => {
    return this.state.data.length >= ENTRIES_PER_PAGE ?
      this.state.data.slice(ENTRIES_PER_PAGE * (this.state.page - 1), ENTRIES_PER_PAGE * this.state.page) :
      this.state.data;
  }
  componentDidUpdate(_, prevState) {
    const { data, page } = this.state;
    if (prevState.page !== page) {
      if (data.length >= ENTRIES_PER_PAGE && page > Math.ceil(data.length/ENTRIES_PER_PAGE)) {
        this.setState({ page: Math.ceil(data.length/ENTRIES_PER_PAGE) });
      }
    }
  }
  render() {
    return (
      <>
        <button
          className="my-2 mr-3 btn btn-outline-secondary"
          onClick={this.toggleAddForm}
        >{this.state.toggleForm ? 'Закрыть' : 'Открыть'} форму</button>
        <button
          className="my-2 mr-3 btn btn-outline-danger"
          onClick={this.props.goBack}
        >Изменить набор данных</button>
        {this.state.toggleForm && <AddForm handleAddEntry={this.handleAddEntry}/>}
        <Search
          handleSearchClick={this.handleSearchClick}
          handleResetClick={this.handleResetClick}
        />
        <Table
          data={this.sliceData()}
          handleSortClick={this.handleSortClick}
          handleShowInfo={this.handleShowInfo}
          info={this.state.info}
          sort={this.state.sort}
        />
        {this.state.data.length >= ENTRIES_PER_PAGE &&
          <Pagination page={this.state.page} handlePageChange={this.handlePageChange} />
        }
      </>
    );
  }
}

export default App;
