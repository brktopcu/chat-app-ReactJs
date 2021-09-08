import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";
import {Button, Grid, Table} from 'semantic-ui-react'

export class Statistics extends Component {

    state={
        stats:[],
    }

    componentDidMount() {
        axios
            .get(
                "http://localhost:8080/statistics/" +
                this.props.match.params.username
            )
            .then((response) => this.setState({ stats: response.data }))
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
                            <Table basic='very' celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Word</Table.HeaderCell>
                                        <Table.HeaderCell>Count</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {this.state.stats.map((stat)=>
                                        <Table.Row>
                                            <Table.Cell>
                                                        {stat.word}
                                            </Table.Cell>
                                            <Table.Cell>{stat.count}</Table.Cell>
                                        </Table.Row>
                                    )
                                    }
                                </Table.Body>
                            </Table>
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

export default connect(mapStateToProps)(Statistics);
