import React, { Component } from 'react';
import moment from 'moment'
import Modal from 'react-modal';
import CommitDetails from './CommitDetails';

const customStyles = {
    content : {
      top                   : '45%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      width : '70%',
      height: '86%',
      transform             : 'translate(-50%, -50%)',
      boxShadow: "1px 4px 6px 5px #9E9E9E",
    }
  };

export default class RepoList extends Component {
    state = {
        modalIsOpen: false,
        activeItem: null,
    };
    componentDidUpdate (prevProps, prevState) {
        
    }

    onClickBack = () => {
        this.setState({
            modalIsOpen: false,
        })  
    }

    openModal = (item) => {
            this.setState({
                modalIsOpen: true,
                activeItem: item,
            })
    }

    closeModal = (item) => {
        this.setState({
            modalIsOpen: false,
        })
    }


    render() {
        const {data, userName} = this.props;
        return (
        <div style={styles.mainDiv}>
            {
                data.map((item, index) => (
                    <ul key={index} onClick={() => this.openModal(item)}>
                        <p 
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer', 
                            height: '45px',
                            fontSize: '22px',
                            }}>{item.name}</p>
                    </ul>
                ))
            }
             <Modal
          isOpen={this.state.modalIsOpen}
          //onAfterOpen={afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
           <CommitDetails data={this.state.activeItem} userName={userName} onClickBack={this.onClickBack}/>
        </Modal>
        </div>
        );
    }
}

const styles = {
    mainDiv: {
        marginTop: '4%', 
        //border: "1px solid black", 
        display: "flex",
        width: '100%',
        padding: '3%',
        boxShadow: "1px 4px 10px 1px #9E9E9E",
        flexDirection: 'column',
        borderRadius: 10,
    },
    scrollView: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        overflowX : 'scroll', 
    },
    thirdSubview: {
        display: 'flex', 
        flexDirection: 'row',
        marginTop: '3%',
        justifyContent: 'space-between',
    },
    pressureView: {
        display: 'flex', 
        flexDirection: 'column',
        marginRight: '2%',
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        width: '50%',
        borderRadius: 4,
    },
    humidityView: {
        display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f2f2f2',
            marginLeft: '2%',
            borderRadius: 4,
            width: '50%',
    },
    sunriseView: {
        display: 'flex', 
            flexDirection: 'column',
            marginRight: '2%',
            alignItems: 'flex-start',
            width: '50%',
            borderRadius: 4,
    },
    sunsetView: {
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginLeft: '2%',
        borderRadius: 4,
        width: '50%',
    }
}