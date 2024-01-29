import React from 'react';
import '../styles/tables.css'

const GrenadeProgressBar = ({ name, sumOfGrenades, grenadeThrown, index, bgColor }) => {
  const roundedClass = index === 'first' ? 'rounded-left' : (index === 'last' ? 'rounded-right' : '');

  if (grenadeThrown !== 0) {
    return (
      <div
        className={`grenade-progress-bar ${roundedClass}`}
        style={{ width: `${grenadeThrown * 100 / sumOfGrenades}%` , backgroundColor: bgColor }}>
        {grenadeThrown * 100 / sumOfGrenades > 10 ? (
          <div className=''>{name}: {grenadeThrown}</div>
        ) : <div>  </div>}

        <div style={{zIndex: '1000'}}>{(grenadeThrown * 100 / sumOfGrenades).toFixed(0)}%</div>
        </div>
    )
  } else {
    return null;
  }
};


export default GrenadeProgressBar;
