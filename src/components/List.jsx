import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/table.css';
import '../styles/list.css';

const ListTemplate = ({ listData, colNames }) => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleRowClick = (item) => {
    navigate(`/statistics/${item.matchId}`);
  };

  return (
    <div className='lists-container'>
      <table className='table-container'>
        <thead>
          <tr>
            {colNames.map((colName, index) => (
              <th key={index}>{colName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listData.map((item, index) => (
            <tr className='extra-tr' key={index} onClick={() => handleRowClick(item)}>
              {colNames.map((colName, colIndex) => (
                <td key={colIndex}>
                  {colIndex === 0 ? (
                    item[colName.toLowerCase()]
                  ) : (
                    item[colName.toLowerCase()]
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

export default ListTemplate;
