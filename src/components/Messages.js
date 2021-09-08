import React, {Component} from "react";
import {Comment, Header} from "semantic-ui-react";
import {connect} from "react-redux";

export class Messages extends Component {
  render() {
    return (
      <div>
        <Comment.Group>
          <Header as="h3" dividing>
            Messages
          </Header>

          {this.props.allMessages.length === 0 ? (
            <h5>No message yet.</h5>
          ) : (
            ""
          )}

          {this.props.allMessages.map((msg) => (
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userDetails: state.userDetails };
};

export default connect(mapStateToProps)(Messages);
