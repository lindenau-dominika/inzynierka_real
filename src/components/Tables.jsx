import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/tables.css'

const MatchTable = ({matchesData, onSort, colNames }) => {
    const handleSort = (column) => {
        onSort(column);
    };

    const handleRowClick = (item) => {
      navigate(`/matches/${item.matchId}`);
    };

    return (
      <div>
        <table>
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