import React, { Component, Fragment } from 'react';
class FilterNav extends Component {

    render () {
        return (
            <Fragment>
            <div className="uk-grid-collapse uk-flex-middle" data-uk-grid>
                <div className="uk-width-expand">
                    <div className="uk-grid-small uk-grid-divider uk-child-width-auto" data-uk-grid>
                        <div>
                            <ul className="uk-subnav uk-subnav-pill" data-uk-margin>
                                <li className="uk-active" data-uk-filter-control=""><a href="/#">All</a></li>
                            </ul>
                        </div>
                        <div>
                            <ul className="uk-subnav uk-subnav-pill" data-uk-margin>
                                <li className="uk-text-bold uk-margin-auto-vertical uk-visible@s">Type:</li>
                                <li data-uk-filter-control="filter: [data-size='nano']"><a href="/#">Nano</a></li>
                                <li data-uk-filter-control="filter: [data-size='micro']"><a href="/#">Micro</a></li>
                                <li data-uk-filter-control="filter: [data-size='macro']"><a href="/#">Macro</a></li>
                                <li data-uk-filter-control="filter: [data-size='mega']"><a href="/#">Mega</a></li>
                            </ul>
                        </div>
                        <div className="uk-visible@s">
                            <div className="uk-width-auto uk-text-nowrap">
                                <span style={{fontSize: '10px'}} className="uk-text-small uk-text-bold uk-margin-small-bottom uk-margin-small-right">
                                    CPA:
                                </span>
                                <span data-uk-filter-control="sort: data-cost">
                                    <a className="uk-icon-link" href="/#" data-uk-icon="icon: arrow-down">&nbsp;</a>
                                </span>
                                <span data-uk-filter-control="sort: data-cost; order: desc">
                                    <a className="uk-icon-link" href="/#" data-uk-icon="icon: arrow-up">&nbsp;</a>
                                </span>
                            </div>
                        </div>
                        <div className="uk-visible@m">
                            <div className="uk-width-auto uk-text-nowrap">
                                <span style={{fontSize: '10px'}} className="uk-text-small uk-text-bold uk-margin-small-bottom uk-margin-small-right">
                                    ENGAGEMENT:
                                </span>
                                <span data-uk-filter-control="sort: data-engagement">
                                    <a className="uk-icon-link" href="/#" data-uk-icon="icon: arrow-down">&nbsp;</a>
                                </span>
                                <span data-uk-filter-control="sort: data-engagement; order: desc">
                                    <a className="uk-icon-link" href="/#" data-uk-icon="icon: arrow-up">&nbsp;</a>
                                </span>
                            </div>
                        </div>
                        <div className="uk-visible@m">
                            <div className="uk-width-auto uk-text-nowrap">
                                <span style={{fontSize: '10px'}} className="uk-text-small uk-text-bold uk-margin-small-bottom uk-margin-small-right">
                                    VALUATION:
                                </span>
                                <span data-uk-filter-control="sort: data-valuation">
                                    <a className="uk-icon-link" href="/#" data-uk-icon="icon: arrow-down">&nbsp;</a>
                                </span>
                                <span data-uk-filter-control="sort: data-valuation; order: desc">
                                    <a className="uk-icon-link" href="/#" data-uk-icon="icon: arrow-up">&nbsp;</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Fragment>
        );
    }
}

export default FilterNav;
