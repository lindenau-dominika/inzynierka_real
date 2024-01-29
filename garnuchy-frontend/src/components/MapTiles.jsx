import React from 'react';
import '../styles/mapTile.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MapTile = ({ data }) => {
  // Dane dla wykresów
  const barData = [
    { name: 'Winrate', value: data.value, fill: '#8884d8' },
    { name: 'rating', value: data.rating, fill: '#82ca9d' }
  ];

  return (
    <div className='map-tile'>
      <h3>{data.label}</h3>
      <img src={data.image} alt={data.label}></img>
      <div className='win-rate'>
        <span>{data.value}%</span>
        <ResponsiveContainer width="100%" height={20}>
          <BarChart data={[barData[0]]} layout="vertical">
            <YAxis type="category" dataKey="name" hide />
            <XAxis type="number" domain={[0, 100]} hide />
            <Bar dataKey="value" fill={barData[0].fill} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className='rating'>
        <span>{data.rating}</span>
        <ResponsiveContainer width="100%" height={20}>
          <BarChart data={[barData[1]]} layout="vertical">
            <YAxis type="category" dataKey="name" hide />
            <XAxis type="number" domain={[0, 10]} hide />
            <Bar dataKey="value" fill={barData[1].fill} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MapTile;
