import React from 'react';
import PropTypes from 'prop-types';
import '../styles/AnalogRating.css'; // Załóżmy, że masz osobny plik CSS do stylizacji

const Speedometer = ({ value, percent, title }) => {
    // Mapuj wartość ratingu na zakres kątów obrotu od 0 do 180 stopni
    const mapValueToAngle = (val) => {
      // Wartość maksymalna dla wskaźnika to 10.0, co odpowiada kątowi 180 stopni
    
        if (percent == true) {
            return -180 + Math.min(360, Math.min(180, (val/100) * 180));
        }

      if (val <= 0) {
        // Zakres od -5 do 0 przypisany do kątów od 0 do 90 stopni
        return -90 + Math.min(360, (val/5) * 90);
      } else {
        // Zakres od 0 do 10 przypisany do kątów od 90 do 180 stopni
        return -90 + Math.min(360, (val/10)  * 90);
      }
    };
  
    const rotation = mapValueToAngle(value);
  
    return (
        <div className="speedometer-container">
          <h6>
          {value.toFixed(2)}</h6>
        <div className="speedometer-indicator" style={{ transform: `rotate(${rotation}deg)` }}>
          <div className="speedometer-label"></div>
        </div>
          <h5>
            {title}
            </h5>
      </div>
    );
  };
  
  Speedometer.propTypes = {
    value: PropTypes.number.isRequired,
  };
  
  export default Speedometer;