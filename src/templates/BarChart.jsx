import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ReferenceLine, Cell } from 'recharts';
import '../styles/charts.css'

export const SimpleBarChart = ({ width, height, data }) => {
  return (
    <div className='charts'>
<h2 style={{ textAlign: 'center', fontSize: '30px' }}>Winrate</h2>

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


export const PlayerUtUseChart = ({ data }) => {
  return (
    <BarChart 
    className='winrate-chart'
    data={data}
    >
      <CartesianGrid strokeDasharray="0" />
      <XAxis dataKey="nickname" />
      <YAxis label={{angle: -90, position: 'insideLeft' }} tick={{ fontSize: 12 }}/>
      <Tooltip
      cursor={{ fill: 'rgba(1,0,0,0.5)' }} // Dostosowanie kursora Tooltip
      offset={20} // Ustawienie odstępu od punktu docelowego
      formatter={(value, name) => [value, name]} // Dostosowanie formatu treści Tooltip
      labelStyle={{color: '#dddddd', fontWeight: 'bold'}}
      contentStyle={{ backgroundColor: '#0C0c10', border: '1px solid #222222' }}
      />
      {/* <Legend /> */}

      {/* Define a bar for each statistic */}
      <Bar dataKey="enemies_flashed" fill="#aaaadb" />
      <Bar dataKey="flash_assists" fill="#bbb111" />
      <Bar dataKey="friends_flashed" fill="#c54ccc" />
      <Bar dataKey="self_flashed" fill="#cc9ccc" />
      <Bar dataKey="avg_blind_time" fill="#ddd6dd" />
      <Bar dataKey="HE_damage" fill="#aaaadb" />
    </BarChart>
  );
};

export const PlayerUtDmgChart = ({ data }) => {
  return (
    <BarChart
    width={600}
    height={400}
    data={data}
    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="nickname" />
      <YAxis />
      <ReferenceLine x={50} stroke="#ffffff" dot={false} />
      <Tooltip
      cursor={{ fill: 'rgba(1,0,0,0.5)' }} // Dostosowanie kursora Tooltip
      offset={20} // Ustawienie odstępu od punktu docelowego
      formatter={(value, name) => [value, name]} // Dostosowanie formatu treści Tooltip
      labelStyle={{color: '#dddddd', fontWeight: 'bold'}}
      contentStyle={{ backgroundColor: '#0C0c10', border: '1px solid #222222' }}
      />
      {/* <Legend /> */}
      <Bar dataKey="decoys_thrown" fill="#aaaadb" />
      <Bar dataKey="HEs_thrown" fill="#c54ccc" />
      {/* <Bar dataKey="avg_unused_util_value" fill="#c54ccc" /> */}
      <Bar dataKey="flashes_thrown" fill="#ddd6dd" />
      <Bar dataKey="molos_thrown" fill="#cc9ccc" />
      
    </BarChart>
  );
};

export default {SimpleBarChart, PlayerUtUseChart, PlayerUtDmgChart};