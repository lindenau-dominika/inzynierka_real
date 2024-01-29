import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

const RatingChart = ({ data, inner, outer, myBarSize, myWidth, myHeight, myMax }) => {
  return (
    
    <RadialBarChart 
      cx={myWidth / 2}
      cy={myHeight / 2}
      innerRadius={inner}
      outerRadius={outer}
      barSize={myBarSize}
      startAngle={180} 
      endAngle={0} 
      width={myWidth}
      height={myHeight}
      data={data}
      // border={'1px solid white'}
    >
      <PolarAngleAxis
        type="number"
        domain={[-myMax, myMax]} 
        angleAxisId={0}
        tick={false}
      />
      <RadialBar
        minAngle={15}
        clockWise={true}
        background={{ fill: '#080810' }}
        dataKey="x"
        label={{ fill: '#fff', position: 'insideStart' }}
      />
    </RadialBarChart>
  );
};

export default RatingChart;
