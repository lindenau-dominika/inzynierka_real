import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ReferenceLine, Cell } from 'recharts';

const SimpleBarChart = ({ width, height, data }) => {
  return (
    <div className='charts'>
<h2 style={{ textAlign: 'center', fontSize: '30px' }}>Winratio</h2>

      <BarChart width={width} height={height} data={data}>
        <XAxis dataKey="map" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <ReferenceLine y={50} stroke="#6c6cb8" dot={false} />

        <Bar dataKey="winratio">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.winratio > 50 ? '#8884d8' : '#ff8fdd'}
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default SimpleBarChart;
