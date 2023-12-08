import React from 'react';
import '../styles/table.css';
import { Link } from 'react-router-dom';
import AvatarImage from '../assets/najs.jpg'

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
        <div className='avatar-col'>{colIndex === 0 && cell ? (
  <>
    <Link to={`https://steamcommunity.com/profiles/${cell.username}`} target='_blank'>
      <img src={cell.image} alt="avatar" className="avatar-image" />
    </Link>
    {cell.nickname}
  </>
) : null}
{colIndex === 1 && cell ? (
  <div className={{alignItems: 'center'}}>
    {cell.rating > 0 ? (
      <div className='greatrating-col'>
        {cell.rating}
      </div>
    ) : (
      <div className='badrating-col'>
        {cell.rating}
      </div>
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
