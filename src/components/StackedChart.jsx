import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Rectangle} from 'recharts';

const StackedChart = ( {myData, myColumns, myDataKey, myMaxYValue} ) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='tooltip'>
          <p style={{color: payload[0].color}}>{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const bars = myColumns.map((column, index) => (
   <Bar key={index} dataKey={column.columnName} stackId="a" fill={column.columnColor} barSize={60}/>
   ));

  return (
      <BarChart
        width={600}
        height={400}
        data={myData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="0" stroke='#333335'/>
        <XAxis dataKey={myDataKey} interval={0} stroke='#e5e5e5' />
        <YAxis type="number" domain={[0, myMaxYValue + 1]} stroke='#e5e5e5' />
        <Tooltip shared={false} content={<CustomTooltip />}/>
        {bars}
      </BarChart>
  );
};

export default StackedChart;