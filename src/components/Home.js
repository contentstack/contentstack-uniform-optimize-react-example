// Home Component

/**
 * Module dependencies.
 */

import React, { Component } from 'react';
import Footer from './Footer';
import HeroBanner from './HeroBanner';
import $ from 'jquery';
import '../staticAssets/css/style.css';
import Stack from './Helper';

import { contentstackOptimizeListReader } from '@uniformdev/optimize-tracker-contentstack';
import { Personalize } from '@uniformdev/optimize-tracker-react';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      home: {},
    };
  }

  async componentDidMount() {
    try {
      let result = await Stack.getEntry('home', [`hero_banner`]);
      this.setState({
        home: result[0][0],
      });
    } catch (err) {
      console.log(err);
    }

    var $header = $('.header-animated');
    var $logoAlt = $header.find('.logo > img').data('logo-alt'); // white logo
    var $logoDefault = $header.find('.logo > img').data('logo-default'); // black logo
    $('.header').css('display', 'block');

    if (window.location.pathname !== '/features' && window.location.pathname !== '/about') {
      $header.removeClass('opaque');
      $header.find('.logo > img').attr('src', $logoAlt);
    }

    $(window).on('scroll', function () {
      if (window.location.pathname !== '/features' && window.location.pathname !== '/about' && window.location.pathname !== '/blog' && !window.location.pathname.includes('/blog/')) {
        if ($(window).scrollTop() > 100) {
          $header.fadeIn().addClass('opaque');
          $header.find('.logo > img').attr('src', $logoDefault);
        } else {
          $header.removeClass('opaque');
          $header.find('.logo > img').attr('src', $logoAlt);
        }
      }
    });
    $('.dropdown').hover(
      function () {
        $('.dropdown').addClass('open');
      },
      function () {
        $('.dropdown').removeClass('open');
      }
    );
  }

  render() {
    if (this.state.home.title != null && this.state.home.url != null) {
      document.title = this.state.home.title;
      const variations = contentstackOptimizeListReader(this.state.home.hero_banner);
      return (
        <>
          <section>
            <div className="wrapper">
              <Personalize name="Personalized Hero" variations={variations} component={HeroBanner} />
              <div className="main-container"></div>
            </div>
            {/* <!-- Video --> */}
            <div className="modal videoModal fade" id="videoModal" tabindex="-1" role="dialog" aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </>
      );
    } else {
      return null;
    }
  }
}

export default Home;
