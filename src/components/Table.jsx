import React, {useState} from 'react';
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
    if (sortConfig.direction === 'ascending') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  return (
    <div className='tablediv'>
      <table className="table-container">
        <thead>
          <tr>
            {colNames.map((colName, index) => (
              <th key={index} onClick={()=> handleSort(index)}>{colName}
              {sortConfig.key === index && (
                <span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
              )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedTableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
             {row.map((cell, colIndex) => (
    <td key={colIndex}>
        <div>{colIndex === 0 && cell ? (
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
        {cell.toFixed(2)}
      </div>
    ) : (
      cell >= 1 ? (
        <div className='greatrating-col'>
          {cell.toFixed(2)}
        </div>
      ) : (
        <div className='badrating-col'>
          {cell.toFixed(2)}
        </div>
      )
    )}
  </div>
) : null}
{colIndex !== 0 && colIndex !== 1 && cell ? (
  <div className='all-col'>
    {cell}
  </div>
) : null}

                  </div>
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
