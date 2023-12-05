import React from 'react';
import '../styles/table.css';

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
                  {colIndex === 0 ? (
                    // Jeśli pierwsza kolumna
                    <div>
                      {typeof cell === 'object' && cell.image ? (
                        // Jeśli wartość jest obiektem i zawiera atrybut 'image', wyświetl zdjęcie
                        <img src={cell.image} alt="avatar" className="avatar-image" />
                      ) : null}
                      {cell.username}
                    </div>
                  ) : (
                    // Jeśli to nie pierwsza kolumna, wyświetl cell
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
