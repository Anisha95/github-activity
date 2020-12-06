import React, { Component } from 'react';

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

  class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            commitsData: null,
            dataList: [],
            activePage: 0,
            totalPages: 0,
            shouldRender: false
         }
         this.handlePageChange = this.handlePageChange.bind(this);
        }

        async componentDidMount() {
            const {data, userName} = this.props;
            let dataList = [];
            let response = await axios.get(`https://api.github.com/repos/${userName}/${data.name}/stats/participation`);
            let commitsData = response.data.all;
    
            
                for (let i = 0; i < commitsData.length; i++) {
                    dataList.push({
                      week: "WEEK " + (i + 1),
                      commit: commitsData[i],
                    });
                  }
                  this.setState({
                      dataList: dataList,
                      activePage: Math.ceil(dataList.length / 10),
                      totalPages: Math.ceil(dataList.length / 10),
                      shouldRender: true
                  })
                
        }
    
        handlePageChange(pageNumber) {
            console.log(`active page is ${pageNumber}`);
            this.setState({activePage: pageNumber});
          }

        getCurrentPageLastIndex() {
            const last_index = this.state.dataList.length - 1;
            let page_last_index =
              last_index - 10 * (this.state.totalPages - this.state.activePage);
            return page_last_index;
          }
        
          getCurrentPageFirstIndex() {
            const page_last_index = this.getCurrentPageLastIndex();
            if (page_last_index - 9 < 0) {
              return 0;
            }
            return page_last_index - 9;
          }

      render() { 
          return ( 
           <div  key={this.state.activePage}>
            <Chart
          data={this.state.dataList.slice(
            this.getCurrentPageFirstIndex(),
            this.getCurrentPageLastIndex() + 1
          )}
        >
          <ArgumentAxis />
          <ValueAxis
            max={
                this.getCurrentPageLastIndex() -
                this.getCurrentPageFirstIndex() +
                1
            }
          />

          <BarSeries valueField="commit" argumentField="week" barWidth={1} color={'green'}/>
          <Title text="Commits - Current year"/>
          <Animation />
        </Chart>
        {this.state.activePage ? (
        <Paginator 
            totalPage={this.state.totalPages}
            activePage={this.state.activePage}
            onChange={this.handlePageChange}
        />) : null}
           </div>  
           );
      }
  }
   
  export default BarChart;