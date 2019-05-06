import React, { Component, Fragment } from 'react';
// import { NavLink } from 'react-router-dom';
import '../../css/Contact.css';

const FooterStyles = {
    // height: '50vh',
    // backgroundSize: 'cover',
    backgroundColor: '#37474f'
};

const ContactFooter = () => {
    return (
        <Fragment>
            <div className="uk-container uk-container-expand uk-padding-remove uk-margin-remove-vertical">
                <div className="uk-text-center uk-padding uk-padding-remove-horizontal">
                    <span className="uk-text-small uk-text-light">
                        &copy;2019 A Product Of Influen$e &nbsp; &bull; &nbsp; Powered by Pixt
                    </span>
                </div>
            </div>
        </Fragment>
    );
};

class Contact extends Component {
    render () {
        return (
            <footer
                style={FooterStyles}
                className="uk-container uk-container-expand uk-margin-remove-top
                    uk-padding-remove uk-background-secondary uk-light uk-position-fixed uk-position-bottom"
                >
                <ContactFooter />
            </footer>
        );
    }
}

export default Contact;
