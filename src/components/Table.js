import React from 'react';
import Info from './Info';

const Table = ({ sort, data, info, handleShowInfo, handleSortClick }) =>
  <>
    <div className="table-responsive">
      {data.length !== 0 &&
        <table className="user-list table table-sm table-bordered table-hover">
          <thead className="thead-light">
            <tr onClick={e => handleSortClick(e)}>
              <th>
                <div className="d-flex justify-content-between align-items-end">
                  <span>ID</span>
                  <span
                    data-type="id"
                    className="sort">{sort.by === 'id' ? sort.dir === 'asc' ? '▲' : '▼' : '⇳'}
                  </span>
                </div>
              </th>
              <th>
                <div className="d-flex justify-content-between align-items-end">
                  <span>First name</span>
                  <span
                    data-type="firstName"
                    className="sort">{sort.by === 'firstName' ? sort.dir === 'asc' ? '▲' : '▼' : '⇳'}
                  </span>
                </div>
              </th>
              <th>
                <div className="d-flex justify-content-between align-items-end">
                  <span>Last name</span>
                  <span
                    data-type="lastName"
                    className="sort">{sort.by === 'lastName' ? sort.dir === 'asc' ? '▲' : '▼' : '⇳'}
                  </span>
                </div>
              </th>
              <th>
                <div className="d-flex justify-content-between align-items-end">
                  <span>E-mail</span>
                  <span
                    data-type="email"
                    className="sort">{sort.by === 'email' ? sort.dir === 'asc' ? '▲' : '▼' : '⇳'}
                  </span>
                </div>
              </th>
              <th>
                <div className="d-flex justify-content-between align-items-end">
                  <span>Phone number</span>
                  <span
                    data-type="phone"
                    className="sort">{sort.by === 'phone' ? sort.dir === 'asc' ? '▲' : '▼' : '⇳'}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) =>
              <tr key={index} onClick={() => handleShowInfo(entry)}>
                <td>{entry.id}</td>
                <td>{entry.firstName}</td>
                <td>{entry.lastName}</td>
                <td>{entry.email}</td>
                <td>{entry.phone}</td>
              </tr>
            )}
          </tbody>
        </table>
      }
      {data.length === 0 && <div>Nothing found :(</div>}
    </div>
    {info && <Info handleShowInfo={handleShowInfo} info={info} />}
  </>

export default Table;
