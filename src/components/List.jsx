import React from 'react';
import '../styles/list.css';
import { Link } from 'react-router-dom';

const ListTemplate = (props) => {
    const { tableData, colNames } = props;
    return (
      <div>
        <table>
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
                  <td key={colIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ListTemplate;