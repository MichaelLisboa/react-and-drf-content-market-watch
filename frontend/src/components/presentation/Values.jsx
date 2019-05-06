import React, { Component, Fragment } from 'react';
import {RootUrl} from "../../constants/Urls"

const imageWidth = {
    maxWidth: "25px"
}

const getMediaItemUrl = (uid) => `${RootUrl}api/v1/media/${uid}`;

const isEqual = function (value, other) {
    // const type = Object.prototype.toString.call(value);

    const compare = function (obj1, obj2) {
        const itemType = Object.prototype.toString.call(obj1);
        if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {

            if (!isEqual(obj1, obj2)) {
                return true;
            }
        } else {
            if (obj1 !== obj2) {
                return true;
            }
        }
    };

    for (const key in value) {
        if (value.hasOwnProperty(key)) {
            if (compare(value[key], other[key]) === true){
                if (value.id && (key === 'media_value' || key === 'engagement' || key === 'acquisition')) {
                    let status = {
                        status: true,
                        obj: value.id,
                        value: key,
                    }
                    return status;
                }
            };
        }
    }

    return { status: false };
};

const applyUpdateState = (obj) => (prevState) => {
    let changed = isEqual(obj, prevState.obj);
    let theState = {
        obj: obj,
        isChanged: changed.status
    }

    return theState;
}

class Values extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: props.data,
            isChanged: false
        }
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            this.setState({isChanged: false})
            this.fetchObjData()
        }, 30000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    fetchObjData = () => {
        // this.setState({ isLoading: true });
        fetch(getMediaItemUrl(this.state.obj.id))
            .then(response => response.json())
            .then(result => {
                this.onSetResult(result)
            });
        }

    onSetResult = (result) =>
        this.setState(applyUpdateState(result))

    render() {
        return (
            <Fragment>
            <div className="uk-card-body">
                <table className="uk-table uk-table-small uk-table-divider uk-table-middle uk-table-justify">
                    <tbody>
                        <tr>
                            <td style={{padding: '5px 0'}} className="uk-width-auto uk-text-small uk-text-nowrap uk-text-truncate">
                                <img
                                    style={imageWidth}
                                    src="https://storage.googleapis.com/pixt-bucket/static/images/badges/wallet.png"
                                    alt="Acquisition cost per user action."
                                    data-uk-image
                                /> Cost/Action</td>
                            <td style={{padding: '5px 0'}}
                                className={`uk-h5 uk-text-right uk-width-auto ${this.state.isChanged ? 'changeActive' : 'changeDefault'}`}>
                                    ${this.state.obj.acquisition}
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: '5px 0'}} className="uk-width-auto uk-text-small uk-text-nowrap">
                                <img
                                    style={imageWidth}
                                    src="https://storage.googleapis.com/pixt-bucket/static/images/badges/coins-stack.png"
                                    alt="Dollar value determined by AI."
                                    data-uk-image
                                /> Valuation</td>
                            <td style={{padding: '5px 0'}}
                                className={`uk-h5 uk-text-right uk-width-auto ${this.state.isChanged ? 'changeActive' : 'changeDefault'}`}>
                                    ${this.state.obj.media_value}
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: '5px 0'}} className="uk-width-auto uk-text-small uk-text-nowrap">
                                <img
                                    style={imageWidth}
                                    src="https://storage.googleapis.com/pixt-bucket/static/images/badges/engagement-badge.png"
                                    alt="Engagement rate."
                                    data-uk-image
                                /> Engagement</td>
                            <td style={{padding: '5px 0'}}
                                className={`uk-h5 uk-text-right uk-width-auto ${this.state.isChanged ? 'changeActive' : 'changeDefault'}`}>
                                    {this.state.obj.engagement}%
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="uk-width-1-1 uk-text-center">
                    <a className="bid-buy-button uk-button uk-button-brand uk-button-small" href="/#">Bid on this</a>
                    <a className="bid-buy-button uk-button uk-button-default uk-margin-small-left uk-button-small" href="/#">Instant Buy</a>
                </div>
            </div>

            <div className="uk-card-footer">
                <div className="uk-grid uk-grid-small uk-grid-divider uk-flex uk-flex-middle" data-uk-grid>
                    <div className="uk-width-expand uk-text-small uk-text-truncate">
                        <a className="uk-link-text uk-link-reset" href={`https://www.instagram.com/p/${this.state.obj.uid}/`} target="_blank" rel="noopener noreferrer">
                            <span data-uk-icon="icon:instagram; ratio: 0.5"></span> {this.state.obj.ig_handle} <span data-uk-icon="icon:arrow-right; ratio: 0.5"></span>
                        </a>
                    </div>
                    <div className="uk-width-auto uk-text-right">
                        <span data-uk-icon="icon:heart; ratio: 0.7"></span> {this.state.obj.edge_likes.toLocaleString()}
                    </div>
                    <div className="uk-width-auto uk-text-right">
                        <span data-uk-icon="icon:comment; ratio: 0.7"></span> {this.state.obj.edge_comments.toLocaleString()}
                    </div>
                </div>
            </div>
            </Fragment>
        );
    }
}

export default Values;
