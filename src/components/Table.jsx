import React, { useState } from 'react';
import '../styles/table.css';
import { Link } from 'react-router-dom';

export const TableTemplate = (props) => {
  const { tableData, colNames } = props;

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedTableData = tableData.slice().sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.direction === 'ascending') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className='tablediv'>
      <table className="table-container">
        <thead>
          <tr>
            {colNames.map((colName, index) => (
              <th key={index} onClick={() => handleSort(index)}>
                {colName}
                {sortConfig.key === index && (
                  <span>{sortConfig.direction === 'ascending'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedTableData.length === 0 ? (
            <tr>
              <td colSpan={colNames.length} className="empty-table-cell">No data available</td>
            </tr>
          ) : (
            sortedTableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>
                    <div>
                      {colIndex === 0 && cell ? (
                        <div className='avatar-col'>
                          <Link to={`https://steamcommunity.com/profiles/${cell.username}`} target='_blank'>
                            <img src={cell.image} alt="avatar" className="avatar-image" />
                          </Link>
                          {cell.nickname}
                        </div>
                      ) : null}
                      {colIndex === 1 && cell ? (
                        <div style={{ alignItems: 'center' }}>
                          {cell > 0 && cell < 1 ? (
                            <div className='neutralrating-col'>
                              {cell}
                            </div>
                          ) : (
                            cell >= 1 ? (
                              <div className='greatrating-col'>
                                {cell}
                              </div>
                            ) : (
                              <div className='badrating-col'>
                                {cell}
                              </div>
                            )
                          )}
                        </div>
                      ) : null}
                      {colIndex !== 0 && colIndex !== 1 && cell !== undefined ? (
                        <div className='all-col'>
                          {cell !== 0 ? cell : 0}
                        </div>
                      ) : null}
                    </div>
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableTemplate;
