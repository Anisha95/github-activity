import React, { useState,} from 'react';

function Paginator ({totalPage, activePage, onChange}) {
        const pageArr = new Array(totalPage).fill({})
        return ( 
            <div style={{
            display: 'flex', 
            marginTop: '5%',
            flexDirection: 'row', 
            justifyContent: 'center'}}>
               {pageArr && pageArr.map((page, i) => (
                   <div 
                   onClick={() => onChange(i + 1)} 
                   key={i+1} style={{
                 border: '1px solid #cdcdcd',
                   margin: '1%',
                   borderRadius: 4,
                   width: '45px',
                   cursor: 'pointer', 
                   backgroundColor: i + 1 == activePage ? '#cdcdcd' : 'white'
                   }}>
                   <p style={{ fontSize: 20, 
                    paddingTop: '14px', 
                    paddingLeft: '14px'
                }}>{i + 1}</p>
                   </div>
               ))}
            </div>
         );
}
 
export default Paginator;