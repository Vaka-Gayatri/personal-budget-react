import React from 'react';
import {Pie} from 'react-chartjs-2';
import axios from 'axios';


const state = {
    labels: [],
    datasets: [
      {
        label: 'Personal Budget',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4',
          '#FA8072',
          '#FF00FF'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F',
        '#FF6347',
        '#C71585'
        ],
        data: []
      }
    ]
  }
export default class Chart extends React.Component{


    
      componentDidMount() {
        axios.get(`http://localhost:4000/budget`)
          .then(res => {
            for (var i = 0; i < res.data.length; i++) {
                state.datasets[0].data[i] = res.data[i].budget;
                state.labels[i] = res.data[i].title;
            }
            this.setState({ state });
          })
      }
    
      render() {
        return (
            <div>
              <Pie
                data={state}
                options={{
                  legend:{
                    display:true,
                    position:'right'
                  }
                }}
              />
            </div>
          );
      }
   
  }


  


  