import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";
import {Button, Comment, Grid, Header, Input} from 'semantic-ui-react'

export class Search extends Component {

    state={
        allMessages:[],
        searchTerm:'',
        foundMessages:[]
    }

    componentDidMount() {
        axios
            .get(
                "http://localhost:8080/userMessages/" +
                this.props.match.params.username
            )
            .then((response) => this.setState({ allMessages: response.data }))
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <div>
                <Grid>
                    <Grid.Row></Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Button primary onClick={() => this.props.history.push("/chat")}>
                                Back
                            </Button>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Input value={this.state.searchTerm}
                                   onChange={(e)=>this.setState({searchTerm:e.target.value})}
                                   placeholder='Search term...' />
                            <Button onClick={()=>{
                                axios
                                    .get(
                                        "http://localhost:8080/searchMessages/" +
                                        this.state.searchTerm
                                    )
                                    .then((response) => this.setState({ allMessages: response.data }))
                                    .catch((error) => console.log(error));
                            }}>Search</Button>
                            <Comment.Group>
                                <Header as="h3" dividing>
                                    Messages
                                </Header>

                                {this.state.length === 0 ? (
                                    <h5>No message.</h5>
                                ) : (
                                    ""
                                )}

                                {this.state.allMessages.map((msg) => (
                                    <Comment key={msg.messageId}>
                                        <Comment.Avatar src={msg.userAvatar} />
                                        <Comment.Content>
                                            <Comment.Author>{msg.messageFrom}</Comment.Author>
                                            <Comment.Metadata>
                                                <div>{msg.messageTime}</div>
                                            </Comment.Metadata>
                                            <Comment.Text>{msg.messageText}</Comment.Text>
                                        </Comment.Content>
                                    </Comment>
                                ))}
                            </Comment.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { userDetails: state.userDetails };
};

export default connect(mapStateToProps)(Search);
