import React, { Component, useState, useEffect } from 'react';
import {months} from '../constants';
import axios from "axios";
import {
    Chart,
    PieSeries,
    Title,
  } from "@devexpress/dx-react-chart-material-ui";
  
  import { Animation } from "@devexpress/dx-react-chart";

  export default function PieChart ({data, userName}) {
   
    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(async () => {
            let url = `https://api.github.com/repos/${userName}/${data.name}/stats/commit_activity`;
            let respJson = await axios.get(url);
            let commitActivity = respJson.data;
            let dataM = [];
            if(commitActivity.length > 0) {
              for (let i = 0; i < 12; i++) {
                let sum = 0;
                for (let j = 0; j < 4; j++) {
                  sum = sum + commitActivity[4 * i + j].total;
                }
        
                let temp = {
                  month: months[i],
                  commit: sum,
                };
                dataM.push(temp);
              }
            } 
            setMonthlyData(dataM);
    }, [])
    
       
        return ( 
            <div style={{border: '1px solid #cdcdcd'}}>
            <Chart data={monthlyData}>
            <PieSeries valueField="commit" argumentField="month" />
            <Title text="Yearly Activity" />
            <Animation />
          </Chart>
          </div>
         );
}
