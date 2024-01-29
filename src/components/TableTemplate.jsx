import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const TableTemplate = (props) => {
  const { tableData, colNames, onSort } = props;

  const handleSort = (column) => {
    onSort(column);
  };
  function getRatingClass(ratingValue) {
    if (typeof ratingValue === 'number') {
      if (ratingValue > 2) {
        return 'ratingp';
      } else if (ratingValue >= 0 && ratingValue <= 2) {
        return '';
      } else if (ratingValue < 0) {
        return 'ratingm';
      }
    }
    return '';
  }

  return (
            <div>
                <table className='details-container'>
                    <thead>
                        <tr>
                            {colNames.map((column, index) => (
                                <th key={index}>
                                    <label onClick={() => handleSort(column.accessor)}>{column.label}</label>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((player, index) => (
                            <tr key={index}>
                                {colNames.map((column, colIndex) => (
                                    <td key={colIndex} className={`${column.accessor === 'rating' ? getRatingClass(player[column.accessor]) : ''}`}>
                                        {column.accessor === 'username' ? (
                                            <div className='row1-container'>
                                                <img src={player.avatar} alt="Avatar" />
                                                <span className="truncate">{player[column.accessor]}</span>
                                            </div>
                                    ) : (
                                        typeof player[column.accessor] === 'number' && !Number.isInteger(player[column.accessor])
                                        ? player[column.accessor].toFixed(2)
                                        : player[column.accessor]
                                        )} 
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
  );
};

export default TableTemplate;
