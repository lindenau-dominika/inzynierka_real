import React from 'react';
import '../styles/table.css';
import { Link } from 'react-router-dom';

export const TableTemplate = (props) => {
  const { tableData, colNames } = props;

  return (
    <div>
      <table className="table-container">
        <thead>
          <tr>
            {colNames.map((colName, index) => (
              <th key={index}>{colName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
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
    {cell.rating > 0 && cell.rating < 1 ? (
      <div className='neutralrating-col'>
        {cell.rating.toFixed(2)}
      </div>
    ) : (
      cell.rating >= 1 ? (
        <div className='greatrating-col'>
          {cell.rating.toFixed(2)}
        </div>
      ) : (
        <div className='badrating-col'>
          {cell.rating.toFixed(2)}
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
