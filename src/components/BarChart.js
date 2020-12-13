import React, {useState, useEffect } from 'react';

import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
  } from "@devexpress/dx-react-chart-material-ui";
  import Paginator from './Paginator';
  import axios from "axios";
  import { Animation } from "@devexpress/dx-react-chart";

  export default function BarChart ({data, userName}) {
   
    const [commitsData, setCommitsData] = useState(null);
    const [dataList, setDataList] = useState([]);
    const [activePage, setActivePage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(async () =>  {
      let dataList = [];
      let response = await axios.get(`https://api.github.com/repos/${userName}/${data.name}/stats/participation`);
      let commitsData = response.data.all;

      
          for (let i = 0; i < commitsData.length; i++) {
              dataList.push({
                week: "WEEK " + (i + 1),
                commit: commitsData[i],
              });
            }
            
            setDataList(dataList);
            setActivePage(Math.ceil(dataList.length / 10));
            setTotalPages( Math.ceil(dataList.length / 10));
            setShouldRender(true);
    }, []);
    
        const handlePageChange = (pageNumber) => {
            console.log(`active page is ${pageNumber}`);
            setActivePage(Math.ceil(pageNumber));
          }

        const getCurrentPageLastIndex = () => {
            const last_index = dataList.length - 1;
            let page_last_index =
              last_index - 10 * (totalPages - activePage);
            return page_last_index;
          }
        
          const getCurrentPageFirstIndex = () => {
            const page_last_index = getCurrentPageLastIndex();
            if (page_last_index - 9 < 0) {
              return 0;
            }
            return page_last_index - 9;
          }
      
          return ( 
           <div  key={activePage + 1}>
            <Chart
          data={dataList.slice(
            getCurrentPageFirstIndex(),
            getCurrentPageLastIndex() + 1
          )}
        >
          <ArgumentAxis />
          <ValueAxis
            max={
                getCurrentPageLastIndex() -
                getCurrentPageFirstIndex() +
                1
            }
          />

          <BarSeries valueField="commit" argumentField="week" barWidth={1} color={'green'}/>
          <Title text="Commits - Current year"/>
          <Animation />
        </Chart>
        {activePage ? (
        <Paginator 
            totalPage={totalPages}
            activePage={activePage}
            onChange={handlePageChange}
        />) : null}
           </div>  
           );
      }
