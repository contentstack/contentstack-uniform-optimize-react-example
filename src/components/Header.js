// Header Component

/**
 * Module dependencies.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import Stack from '../plugin/Helper';

const Header = () => {
  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [header, setHeader] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        let result = await Stack.getEntry('header');
        setHeader(result[0][0]);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const onOpenModalSignUp = () => {
    setSignUp(true);
  };

  const onOpenModalLogin = () => {
    setLogin(true);
  };

  const onCloseSignUp = () => {
    setSignUp(false);
  };

  const onCloseLogin = () => {
    setLogin(false);
  };

  if (header !== '') {
    return (
      <>
        <header
          className="header header-animated"
          style={{
            display: 'block',
          }}
        >
          <div className="container">
            <nav className="navbar navbar-default" role="navigation">
              <div className="navbar-header">
                <a className="logo" href={header.logo.link.href}>
                  <img className="img-responsive logo" src={header.logo.image.url} alt="" data-logo-alt={header.logo.image.url} data-logo-default={header.logo.color_image.url} />
                </a>
              </div>

              <div className="nav-toggle collapsed" data-toggle="collapse" data-target="#navbarMain" aria-expanded="false" style={{ top: '15px' }}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
              <div className="navbar-collapse collapse in" id="navbarMain" aria-expanded="true" style={{ top: '65px' }}>
                <ul className="nav navbar-nav navbar-right">
                  {header.cta.map((item, i) => {
                    if (item.title === 'Sign Up') {
                      return (
                        <li key={i}>
                          <button className="btn btn-primary-outline" id="signup" onClick={onOpenModalSignUp}>
                            {item.title}
                          </button>
                        </li>
                      );
                    } else if (item.title === 'Login') {
                      return (
                        <li key={i}>
                          <button className="btn btn-primary-outline" id="login" onClick={onOpenModalLogin}>
                            {header.cta[1].title}
                          </button>
                        </li>
                      );
                    }
                  })}
                </ul>
                <ul className="nav navbar-nav collapsed-color">
                  <>
                    {header.navigation_section.navigation_bar.map((navLink, i) => {
                      return (
                        <li key={i}>
                          {' '}
                          <Link to={navLink.link} className="nav-link">
                            {navLink.title}
                          </Link>{' '}
                        </li>
                      );
                    })}
                  </>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        {/* Sign up model */}

        <Modal open={signUp} onClose={onCloseSignUp}>
          <div className="modal-body">
            <h2>
              Get Started Absolutely<span> Free!</span>
            </h2>
            <span className="subtitle">No credit card needed</span>
            <form className="contact-form form-validate3" novalidate="novalidate">
              <div className="form-group">
                <input className="form-control" type="text" name="name" id="name" placeholder="First Name" required="" autocomplete="off" aria-required="true" />
              </div>
              <div className="form-group">
                <input className="form-control" type="email" name="email" placeholder="E-mail" required="" autocomplete="off" aria-required="true" />
              </div>
              <div className="form-group">
                <input type="password" name="pass" className="form-control" placeholder="Password" required="" autocomplete="off" aria-required="true" />
              </div>
              <input className="btn btn-md btn-primary btn-center" id="sign_up" type="button" value="Sign Up" />
            </form>
          </div>
        </Modal>

        {/* <!-- signUp End -->
                  <!-- login --> */}

        <Modal open={login} onClose={onCloseLogin}>
          <div className="modal-body">
            <h2>
              Login and Get <span>Started</span>
            </h2>
            <span className="subtitle">Just fill in the form below</span>
            <form className="contact-form form-validate4" novalidate="novalidate">
              <div className="form-group">
                <input className="form-control" type="email" name="email" placeholder="E-mail" required="" autocomplete="off" aria-required="true" />
              </div>
              <div className="form-group">
                <input type="password" name="pass" className="form-control" placeholder="Password" required="" autocomplete="off" aria-required="true" />
              </div>
              <input className="btn btn-md btn-primary btn-center" id="login_btn" type="button" value="Login" />
            </form>
          </div>
        </Modal>
      </>
    );
  } else if (header === '') {
    return null;
  }
};

export default Header;
