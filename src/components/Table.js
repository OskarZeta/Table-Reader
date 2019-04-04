import React, { Component } from 'react';
import Info from './Info';

class Table extends Component {
  render() {
    const data = this.props.data;
    return(
      <>
        <table>
          <tbody>
            <tr onClick={e => this.props.handleSortClick(e)}>
              <th data-type="id">id</th>
              <th data-type="firstName">firstName</th>
              <th data-type="lastName">lastName</th>
              <th data-type="email">email</th>
              <th data-type="phone">phone</th>
            </tr>
            {data.map((entry, index) =>
              <tr key = {index} onClick={() => this.props.handleShowInfo(entry)}>
                <td>{entry.id}</td>
                <td>{entry.firstName}</td>
                <td>{entry.lastName}</td>
                <td>{entry.email}</td>
                <td>{entry.phone}</td>
              </tr>
            )}
          </tbody>
        </table>
        {this.props.info &&
          <Info
            handleShowInfo={this.props.handleShowInfo}
            info={this.props.info}
          />
        }
      </>
    );
  }
}
export default Table;
