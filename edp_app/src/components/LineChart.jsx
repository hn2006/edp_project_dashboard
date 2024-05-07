import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({chartData}) => {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'recent speeds',
          },
        }
      };



      const labels = [0];
      const fielddata=[0];

      chartData&&chartData.map((temp)=>{
        labels.push(temp.time);
        fielddata.push(Number(temp.speed).toPrecision(2));
        return temp;
      })
      
      const data = {
        labels,
        datasets: [
          {
            label: '',
            data:fielddata ,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
          }
        ],
      };
  return (
    <div style={{width:'100%',height:'300px',display:'flex',justifyContent:'center',alignItems:'center'}}><Line style={{width:'50%',height:'100%'}} options={options} data={data} /></div>
  )
}

export default LineChart