import React, { Component } from 'react'
import Axios from 'axios'
import Loading from '../UI/Loading'
import Poll from './Poll'
import './Polls.css'

class Polls extends Component {
    constructor(props){
        super(props);
        this.state = {
            polls : [],
            isLoading : false
        }
    }
    componentDidMount(){

        this.setState({
            isLoading : true
        });

        Axios({
            url : "http://localhost:6541/poll",
            method : "GET",
            headers : {"Authorization" : "Bearer "}
        })
        .then(response => {
            if(response.status === 200){
                this.setState({
                    isLoading : false,
                    polls : response.data
                });
            } 
        })
    }

    castVoteHandler(pollId,choiceId,choiceName) {

    }

    onVoteChangeHandler(e,pollId) {

    }

    render(){

        const polls = this.state.polls.map(poll => {
            return (<Poll key={poll.id} poll={poll} onSubmitHandler={this.castVoteHandler}
            onVoteChangeHandler={this.onVoteChangeHandler}></Poll>)
        });

        if(this.state.isLoading){
            return <Loading></Loading>
        }
        return (
            <div className="Polls">
                { polls }
            </div>
        )
    }
    
}

export default Polls


