import React, { useState, useEffect } from 'react';

import $ from 'jquery';
import ReactHtmlParser from 'react-html-parser';
import Stack from '../plugin/Helper';

const About = () => {
  const [about, setAbout] = useState('');

  // data fetch hook
  useEffect(() => {
    const getData = async () => {
      try {
        let result = await Stack.getEntry('about_page');
        setAbout(result[0][0]);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  // animations  hook
  useEffect(() => {
    let $header = $('.header-animated');
    let $logoDefault = $header.find('.logo > img').data('logo-default'); // black logo
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
  });

  if (about !== '') {
    document.title = about.title;
    return (
      <>
        <div className="main-container">
          <section className="team-wrap">
            <div className="container">
              <div className="row">
                <div className="col-md-4 margin-top-50 margin-bottom">
                  {about.team_section.content ? ReactHtmlParser(about.team_section.content) : ''}
                  <a href="#" className="btn btn-primary mrl">
                    {about.team_section.cta ? about.team_section.cta[0].title : ''}
                  </a>
                  <a href="#" className="btn btn-secondary">
                    {about.team_section.cta ? about.team_section.cta[1].title : ''}
                  </a>
                </div>
                <div className="col-md-8">
                  <img className="img-responsive" src={about.team_section.image.url} alt="section image" />
                </div>
              </div>
            </div>
          </section>
          <section className="promotion-wrap margin-top-max margin-bottom-max">
            <div className="container">
              <div className="text-center">{about.promote.description ? ReactHtmlParser(about.promote.description) : ''}</div>
              <div className="img-wrap">
                <img className="img-responsive" src={about.promote.image.url} alt="" />
              </div>
              <div className="row">
                <div className="col-md-offset-2 col-md-8 text-justify">
                  {about.promote.sub_content ? ReactHtmlParser(about.promote.sub_content) : ''}
                  <div className="row">
                    {about.promote.store_section.map((item, index) => {
                      return (
                        <div className="col-sm-4" key={index}>
                          <a href="#" className="icons-links">
                            <div className="icons-img-cont">
                              <img className="img-responsive" src={item.color_image.url} alt="color app" />
                              <img className="img-responsive" src={item.image.url} alt="app item" />
                            </div>
                            <h4>{item.title}</h4>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {about.testimonials.map((item, index) => {
            return (
              <div
                className="blockquote-wrap"
                style={{
                  backgroundImage: `url(${item.background_image.url})`,
                }}
                key={index}
              >
                <div className="background-overlay"></div>
                <div className="container">
                  <blockquote>
                    <p></p>
                    {item.description ? ReactHtmlParser(item.description) : ''}
                    <p></p>
                    <p className="speaker">{item.name}</p>
                  </blockquote>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  } else if (about === '') {
    return null;
  }
};

export default About;
