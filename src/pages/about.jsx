import React, { useState, useEffect } from 'react';

import $ from 'jquery';
import lodash from 'lodash';
import ReactHtmlParser from 'react-html-parser';
import Stack from '../plugin/contentstack';

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
    const relativePath = lodash.get(window, 'location.pathname');
    let $header = $('.header-animated');
    let $logoDefault = $header.find('.logo > img').data('logo-default'); // black logo
    $('.header').css('display', 'block');

    if (relativePath === '/features' || relativePath === '/about') {
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

  if (!about) return null;
  else {
    document.title = about.title;
    const { team_section, promote, testimonials } = about;
    return (
      <div>
        <div className="main-container">
          <section className="team-wrap">
            <div className="container">
              <div className="row">
                <div className="col-md-4 margin-top-50 margin-bottom">
                  {team_section.content ? ReactHtmlParser(team_section.content) : ''}
                  <a href="#" className="btn btn-primary mrl">
                    {team_section.cta ? team_section.cta[0].title : ''}
                  </a>
                  <a href="#" className="btn btn-secondary">
                    {team_section.cta ? team_section.cta[1].title : ''}
                  </a>
                </div>
                <div className="col-md-8">
                  <img className="img-responsive" src={team_section.image.url} alt="section image" />
                </div>
              </div>
            </div>
          </section>
          <section className="promotion-wrap margin-top-max margin-bottom-max">
            <div className="container">
              <div className="text-center">{promote.description ? ReactHtmlParser(promote.description) : ''}</div>
              <div className="img-wrap">
                <img className="img-responsive" src={promote.image.url} alt="" />
              </div>
              <div className="row">
                <div className="col-md-offset-2 col-md-8 text-justify">
                  {promote.sub_content ? ReactHtmlParser(promote.sub_content) : ''}
                  <div className="row">
                    {promote.store_section.map(({ title, color_image, image }, index) => {
                      return (
                        <div className="col-sm-4" key={index}>
                          <a href="#" className="icons-links">
                            <div className="icons-img-cont">
                              <img className="img-responsive" src={color_image.url} alt="color app" />
                              <img className="img-responsive" src={image.url} alt="app item" />
                            </div>
                            <h4>{title}</h4>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {testimonials.map((item, index) => {
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
      </div>
    );
  }
};

export default About;
