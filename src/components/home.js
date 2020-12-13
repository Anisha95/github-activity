import React, { useState } from "react";
import "../App.css";
import RepoList from "./RepoList";

export default function Home () {

  const [userName, setUserName] = useState('');
  const [userDetails, setuserDetails] = useState(null);
 

  const fetchUserDetails = (userName) => {
      fetch(
        `https://api.github.com/users/${userName}/repos`
      )
        .then(response => response.json())
        .then(responseData => {
          setuserDetails(responseData)
        });
  
  }

    return (
      <div style={styles.mainStyle}>
        <div 
        style={styles.boxStyle}>
          <input
            type="search"
            className="search"
            style={{ width: "90%", border: "none", fontSize: '20px'}}
            placeholder={"Search or jump to..."}
            onChange={e =>
              setUserName( e.target.value)
            }
            value={userName}
          />
         
          <button onClick={() => fetchUserDetails(userName)}
            style={{backgroundColor: 'white', border: 'none'}}
          >
          <h2>SEARCH</h2>
          </button>
         
        </div>
        <div style={styles.secondDiv}>
          {userDetails && !userDetails.message ? (
         <RepoList data={userDetails} userName={userName}/>)
            : null
          }
        </div>
      </div>
    );
}

const styles = {
  mainStyle: {
    display: "flex",
    alignItems: "center",
    margin: "1.6%",
    marginLeft: "20%",
    marginRight: "20%",
    flexDirection: "column"
  },
  boxStyle: {
    display: "flex",
    flexDirection: "row",
    height: 80,
    marginTop: '7%',
    borderRadius: 8,
    padding: "1.6%",
    justifyContent: "space-between",
    boxShadow: "1px 4px 6px 1px #9E9E9E",
    width: "100%"
  },
  secondDiv: {
    display: "flex",
    marginTop: "4%",
    flexDirection: "row",
    flexGrow: 1,
    width: "100%"
  }
};
