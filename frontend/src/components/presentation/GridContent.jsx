import React, { Component, Fragment } from 'react';
import {RootUrl} from "../../constants/Urls";
import { compose } from 'recompose';
import FilterNav from "./FilterNav.jsx";
import OffCanvas from "../OffCanvas.jsx";
import PostListItem from "./PostListItem.jsx";

const getMarketWatchUrl = (page) => `${RootUrl}api/v1/media/?limit=25&offset=${page}`;

const applyUpdateResult = (result, page) => (prevState) => {
    const filteredList = result.results.filter(({ id: id1 }) => !prevState.posts.some(({ id: id2 }) => id2 === id1));

    const updatedPosts = {
        posts: [...prevState.posts, ...filteredList],
        page: page + 25,
        next: result.next,
        isLoading: false
    }

    return updatedPosts;
}

const applySetResult = (result, page) => (prevState) => ({
    posts: result.results,
    page: page + 25,
    next: result.next,
    isLoading: false,
})

const applyAddItems = (result, page) => (prevState) => {
    const thelist = result.results.filter(({ id: id1 }) => !prevState.posts.some(({ id: id2 }) => id2 === id1));
    const mergedlist = thelist.length ? [...prevState.posts.slice(0, -1), ...thelist] : [...prevState.posts];
    if (thelist.length) console.log("THE FILTERED LIST", thelist)

    const statestuff = {
        posts: mergedlist,
        isLoading: false
    }

    return statestuff;
};

const withLoading = (Component) => (props) =>
    <Fragment>
        <Component {...props} />
        <div className="interactions uk-container uk-container-expand uk-text-center uk-margin-large">
            {props.isLoading && <span>Loading...</span>}
        </div>
    </Fragment>

const withInfiniteScroll = (Component) =>
    class WithInfiniteScroll extends React.Component {
        componentDidMount() {
            window.addEventListener('scroll', this.onScroll, false);
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.onScroll, false);
        }

        onScroll = () => {
            if (
                (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
                this.props.post.length &&
                !this.props.isLoading &&
                this.props.next !== null
                ) {
                this.props.onPaginatedSearch();
            }
        }

    render() {
        return <Component {...this.props} />;
    }
}

class GridContent extends Component {

    constructor (props) {
        super(props);
        this.state = {
            posts: [],
            next: null,
            page: null,
            isLoading: false
        };
    }

    onInitialSearch = (e) =>
        this.fetchStories(0);

    onPaginatedSearch = (e) =>
        this.fetchStories(this.state.page);

    fetchStories = page => {
        this.setState({ isLoading: true });
        fetch(getMarketWatchUrl(page))
            .then(response => response.json())
            .then(result => this.onSetResult(result, page));
      }

    fetchNewStories = () => {
        this.setState({ isLoading: true });
        fetch(getMarketWatchUrl(0))
            .then(response => response.json())
            .then(result => {
                this.setState(applyAddItems(result, 0))
            });
      }

    onSetResult = (result, page) =>
        page === 0
          ? this.setState(applySetResult(result, page))
          : this.setState(applyUpdateResult(result, page));

    componentDidMount() {
        this.fetchStories(0);

        this.objListID = setInterval(() => {
            this.fetchNewStories();
        }, 120000);
    }

    componentWillUnmount() {
        clearInterval(this.objListID);
    }

    render () {
        return (
            <Fragment>
            <div data-uk-filter="target: .js-filter">
                <section className="marketwatch-grid uk-margin-large-top uk-section uk-section-small uk-section-default uk-padding-remove-bottom">
                    <div className="uk-container uk-container-expand uk-margin-large-bottom">
                        <OffCanvas />
                        <FilterNav />
                        <PostListWithLoadingWithInfinite
                            key={this.state.posts.id}
                            post={this.state.posts}
                            page={this.state.page}
                            next={this.state.next}
                            isLoading={this.state.isLoading}
                            onPaginatedSearch={this.onPaginatedSearch}
                        />
                    </div>
                </section>
            </div>
            </Fragment>
        );
    }
}

const PostListWithLoadingWithInfinite = compose(
    withInfiniteScroll,
    withLoading,
)(PostListItem);

export default GridContent;
