import React, { Component } from "react";
import "../App.css";
import { FaSearch } from "react-icons/fa";
import RepoList from "./RepoList";

class Home extends Component {
  state = {
    geoLocCity: '',
    weatherUpdate: null,
    userName: '',
    userDetails: null,
  };

  getWeatherUpdate = (maxTemp, minTemp) => {
    let {weekArr} = this.state;
    let activeIndex = new Date().getDay();
    weekArr[activeIndex].maxTemp = maxTemp;
    weekArr[activeIndex].minTemp = minTemp;
    this.setState({
        weekArr: weekArr
    })
  };

  fetchUserDetails = (userName) => {
      fetch(
        `https://api.github.com/users/${userName}/repos`
      )
        .then(response => response.json())
        .then(responseData => {
          this.setState({
            userDetails: responseData
          });
        });
  
  }

  
  render() {
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
              this.setState({
                userName: e.target.value
              })
            }
            value={this.state.userName}
          />
         
          <button onClick={() => this.fetchUserDetails(this.state.userName)}
            style={{backgroundColor: 'white', border: 'none'}}
          >
          <h2>SEARCH</h2>
          </button>
         
        </div>
        <div style={styles.secondDiv}>
          {this.state.userDetails && !this.state.userDetails.message ? (
         <RepoList data={this.state.userDetails} userName={this.state.userName}/>)
            : null
          }
        </div>
      </div>
    );
  }
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

export default Home;
