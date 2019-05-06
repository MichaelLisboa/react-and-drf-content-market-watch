import React, { Component } from 'react';
import '../css/Grid.css';

class Header extends Component {
    render () {
        return (
            <header id="site-head">
                <div className="uk-container uk-container-expand">
                    <div className="uk-grid uk-grid-small uk-flex uk-flex-middle" data-uk-grid>
                        <div className="uk-width-auto">
                            <a className="uk-link-text" href="https://www.influense.me/">
                                <span className="uk-logo">
                                    <span className="brand-text-color">Influen$e</span> MarketWatch
                                </span>
                            </a>
                        </div>
                        <span style={{fontSize: "10px"}} className="uk-position-center-right uk-margin-medium-right uk-text-muted uk-visible@s">
                            &copy;2019 A Product Of <a className="brand-text-color" href="https://www.influense.me">Influen$e</a> &nbsp; &bull; &nbsp; Powered by <a style={{color: "#6CB670", textDecoration: 'none'}} href="https://www.pixt.us">Pixt</a>
                        </span>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
