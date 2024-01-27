import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/tables.css'

const MatchTable = ({matchesData, onSort, colNames }) => {
    const handleSort = (column) => {
        onSort(column);
    };
    // const formatDate = (dateString) => {
    //     const date = new Date(dateString);
    //     const options = {
    //         weekday: 'long',
    //         day: '2-digit',
    //         month: 'short',
    //         year: 'numeric',
    //         hour: '2-digit',
    //         minute: '2-digit',
    //         hour12: false
    //     };
    //     return new Intl.DateTimeFormat('en-US', options).format(date);
    // }
    const handleRowClick = (item) => {
      navigate(`/matches/${item.matchId}`);
    };

    return (
      <div className='lists-container'>
        <table className='table-container'>
          <thead>
            <tr>
              {colNames.map((colName, index) => (
                <th key={index}><button onClick={() => handleSort({colName})}>{colName}</button></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matchesData.map((item, index) => (
              <tr className='extra-tr' key={index} onClick={() => handleRowClick(item)}>
                {colNames.map((colName, colIndex) => (
                  <td key={colIndex}>
                    <Link to={`/matches/${index}/general`}>
                      {colName}
                    </Link>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

}

export default MatchTable;