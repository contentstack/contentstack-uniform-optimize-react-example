// About Component

/**
 * Module dependencies.
 */

import React, { Component } from 'react';
import '../staticAssets/css/style.css';
import Footer from './Footer';
import $ from 'jquery';
import ReactHtmlParser from 'react-html-parser';
import Stack from './Helper';

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aboutState: '',
    };
  }

  async componentDidMount() {
    try {
      let result = await Stack.getEntry('about_page');
      this.setState({
        aboutState: result[0][0],
      });
    } catch (err) {
      console.log(err);
    }

    var $header = $('.header-animated');
    var $logoDefault = $header.find('.logo > img').data('logo-default'); // black logo
    $('.header').css('display', 'block');

    if (window.location.pathname === '/features' || window.location.pathname === '/about') {
      $('.header').addClass('opaque');
      $header.find('.logo > img').attr('src', $logoDefault);
    } else {
      $('.header').removeClass('opaque');
    }
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
    if (this.state.aboutState !== '') {
      document.title = this.state.aboutState.title;
      const aboutTeam = this.state.aboutState.team_section.content;
      const promoteSection = this.state.aboutState.promote.description;
      const descriptionsub_content = this.state.aboutState.promote.sub_content;
      const testimonials = this.state.aboutState.testimonials[0].description;

      return (
        <>
          <div class="main-container">
            <section class="team-wrap">
              <div class="container">
                <div class="row">
                  <div class="col-md-4 margin-top-50 margin-bottom">
                    {ReactHtmlParser(aboutTeam)}
                    <a href="#" class="btn btn-primary mrl">
                      {this.state.aboutState.team_section.cta[0].title}
                    </a>
                    <a href="#" class="btn btn-secondary">
                      {this.state.aboutState.team_section.cta[1].title}
                    </a>
                  </div>
                  <div class="col-md-8">
                    <img class="img-responsive" src={this.state.aboutState.team_section.image.url} alt="" />
                  </div>
                </div>
              </div>
            </section>
            <section class="promotion-wrap margin-top-max margin-bottom-max">
              <div class="container">
                <div class="text-center">{ReactHtmlParser(promoteSection)}</div>
                <div class="img-wrap">
                  <img class="img-responsive" src={this.state.aboutState.promote.image.url} alt="" />
                </div>
                <div class="row">
                  <div class="col-md-offset-2 col-md-8 text-justify">
                    {ReactHtmlParser(descriptionsub_content)}
                    <div class="row">
                      <div class="col-sm-4 ">
                        <a href="#" className="icons-links">
                          <div class="icons-img-cont">
                            <img class="img-responsive" src={this.state.aboutState.promote.store_section[0].color_image.url} alt="" />
                            <img class="img-responsive" src={this.state.aboutState.promote.store_section[0].image.url} alt="" />
                          </div>
                          <h4>{this.state.aboutState.promote.store_section[0].title}</h4>
                        </a>
                      </div>
                      <div class="col-sm-4">
                        <a href="#" class="icons-links">
                          <div class="icons-img-cont">
                            <img class="img-responsive" src={this.state.aboutState.promote.store_section[1].color_image.url} alt="" />
                            <img class="img-responsive" src={this.state.aboutState.promote.store_section[1].image.url} alt="" />
                          </div>
                          <h4>{this.state.aboutState.promote.store_section[1].title}</h4>
                        </a>
                      </div>
                      <div class="col-sm-4">
                        <a href="#" class="icons-links">
                          <div class="icons-img-cont">
                            <img class="img-responsive" src={this.state.aboutState.promote.store_section[2].color_image.url} alt="" />
                            <img class="img-responsive" src={this.state.aboutState.promote.store_section[2].image.url} alt="" />
                          </div>
                          <h4>{this.state.aboutState.promote.store_section[2].title}</h4>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div
              class="blockquote-wrap"
              style={{
                'background-image': `url(${this.state.aboutState.testimonials[0].background_image.url})`,
              }}
            >
              <div class="background-overlay"></div>
              <div class="container">
                <blockquote>
                  <p></p>
                  <p>{ReactHtmlParser(testimonials)}</p>
                  <p></p>
                  <p class="speaker">{this.state.aboutState.testimonials[0].name}</p>
                </blockquote>
              </div>
            </div>
          </div>
          <Footer />
        </>
      );
    } else if (this.state.aboutState === '') {
      return null;
    }
  }
}

export default About;
