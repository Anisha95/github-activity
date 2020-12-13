import React from 'react';
  import BarChart from './BarChart';
  import PieChart from './PieChart';
  import {FaAngleLeft} from "react-icons/fa";

  export default function CommitDetails ({data, userName, onClickBack}) {
        return ( 
        <div style={{ width: '100%', padding: '5%', height: '100%'}}>
            <div onClick={onClickBack} style={{cursor: 'pointer'}}>
            <FaAngleLeft size="3em" />
            </div>
        <BarChart data={data} userName={userName}/>
        <PieChart data={data} userName={userName} />
        </div>);
}
