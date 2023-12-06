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
                {colIndex === 0 && cell ? (
                    <div>
                    <Link to={`https://steamcommunity.com/profiles/${cell.username}`} target='_blank'>
                        <img src={cell.image} alt="avatar" className="avatar-image" />
                    </Link>
                    </div>
                ) : (
                    cell
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
