import React, { Fragment } from 'react';
import Values from "./Values.jsx";
import PostedTime from "./PostedTime.jsx";
import '../../css/Grid.css';
const MEDIA_URL = `https://storage.googleapis.com/pixt-bucket/`;

const getTypebyFollowers = data => {
    let influencerType;
    if (data <= 5000) {
        influencerType = 'nano'
    } else if (data > 5000 && data <= 100000) {
        influencerType = 'micro'
    } else if (data > 100000 && data <= 1000000) {
        influencerType = "macro"
    } else {
        influencerType = "mega"
    }

    return influencerType;
}

const getMediaValues = data => {
    let labels = data.labels.values,
        entities = data.entities.values,
        logos = data.logos.values,
        landmarks = data.landmarks.values,
        sentiments = data.sentiments.values,
        values = [
            ...labels,
            ...entities,
            ...logos,
            ...landmarks,
            ...sentiments]
            .join(' ');
    return values
}

const PostListItem = ({ post, page, next, isLoading, onPaginatedSearch }) =>
    <Fragment>
        <div
            className="uk-grid uk-grid-small uk-child-width-1-2@s uk-child-width-1-4@m uk-child-width-1-5@l js-filter"
            data-uk-grid="masonry: true"
            data-uk-sortable="handle: .drag-icon">
        {
            post.sort((a, b) =>
                new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            ).map(item =>
            <div
                key={item.id}
                data-cost={parseFloat(item.acquisition.replace(/,/g, '')) * 100}
                data-engagement={parseFloat(item.engagement) * 100}
                data-valuation={parseFloat(item.media_value.replace(/,/g, '')) * 100}
                data-size={getTypebyFollowers(item.followers)}
                data-tags={`${item.ig_handle} ${item.tag_list.replace(/,/g, ' ')} ${getMediaValues(item.media_values)}`}
                >
                <div className="uk-card uk-card-small uk-card-grey uk-box-shadow-medium uk-box-shadow-hover-large">
                    <div className="uk-card-header">
                        <div className="uk-grid uk-grid-small uk-text-small" data-uk-grid>
                            <div className="uk-width-expand uk-text-truncate">
                                <a
                                    className="uk-link-text uk-link-reset"
                                    href={`https://www.instagram.com/p/${item.uid}/`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >
                                    <span className="cat-txt">{`@${item.ig_handle}`}</span>
                                </a>
                            </div>
                            <div className="uk-width-auto uk-text-right uk-text-muted uk-text-small">
                                <span style={{marginRight: '5px'}} data-uk-icon="icon:clock; ratio: 0.7" />
                                <small><PostedTime timestamp={item.timestamp} /></small>
                            </div>
                        </div>
                    </div>

                    <div className="uk-card-media">
                        <img
                            className="lazy"
                            data-src={MEDIA_URL + item.pixt_img + '.thumb.jpg'}
                            src={MEDIA_URL + item.pixt_img + '.thumb.jpg'}
                            alt={`Posted by @${item.ig_handle}`}
                            data-uk-img
                        />
                    </div>
                    <Values data={item} />
                </div>
            </div>
        )}
    </div>
</Fragment>

export default PostListItem
