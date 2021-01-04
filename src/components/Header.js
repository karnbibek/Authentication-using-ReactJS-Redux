import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './HeaderStyle.css';

class Header extends React.Component {
    renderLinks() {
        if (this.props.authenticated) {
            return(
                <div className="right menu">
                    <div className="ui item">
                    <Link to="/feature">Feature</Link>
                    </div>
                    <div className="ui item">
                    <Link to="/signout">Signout</Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="right menu">
                    <div className="ui item">
                        <Link to="/signup">Signup</Link>
                    </div>
                    <div className="ui item">
                        <Link to="/signin">Signin</Link>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="ui secondary pointing menu">
                <div className="item">
                    <Link to="/">Redux Auth</Link>
                </div>
                {this.renderLinks()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(Header);