import React, { Component } from 'react';
  import BarChart from './BarChart';
  import PieChart from './PieChart';
  import {FaAngleLeft} from "react-icons/fa";

class CommitDetails extends Component {
    render() { 
        const {data, userName} = this.props;
        return ( 
        <div style={{ width: '100%', padding: '5%', height: '100%'}}>
            <div onClick={this.props.onClickBack} style={{cursor: 'pointer'}}>
            <FaAngleLeft size="3em" />
            </div>
        <BarChart data={data} userName={userName}/>
        <PieChart data={data} userName={userName} />
        </div>);
    }
}
 
export default CommitDetails;