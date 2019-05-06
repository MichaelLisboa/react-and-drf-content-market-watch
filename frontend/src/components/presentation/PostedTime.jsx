import { Component } from 'react';
import moment from 'moment';

class PostedTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: props.timestamp
        };
    }

    componentDidMount() {
        this.postedID = setInterval(
            () => this.tick(),
            60000
        );
    }

    componentWillUnmount() {
        clearInterval(this.postedID);
    }

    tick() {
        this.setState({
            time: this.state.time
        });
    }

    render() {
        return (
            moment(this.state.time).fromNow()
        );
    }
}

export default PostedTime;
