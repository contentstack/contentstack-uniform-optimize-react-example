import React, { useState, useEffect } from 'react';

import $ from 'jquery';
import ReactHtmlParser from 'react-html-parser';
import Stack from '../components/Helper';

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
        <div class="main-container">
          <section class="team-wrap">
            <div class="container">
              <div class="row">
                <div class="col-md-4 margin-top-50 margin-bottom">
                  {about.team_section.content ? ReactHtmlParser(about.team_section.content) : ''}
                  <a href="#" class="btn btn-primary mrl">
                    {about.team_section.cta[0].title}
                  </a>
                  <a href="#" class="btn btn-secondary">
                    {about.team_section.cta[1].title}
                  </a>
                </div>
                <div class="col-md-8">
                  <img class="img-responsive" src={about.team_section.image.url} alt="section image" />
                </div>
              </div>
            </div>
          </section>
          <section class="promotion-wrap margin-top-max margin-bottom-max">
            <div class="container">
              <div class="text-center">{about.promote.description ? ReactHtmlParser(about.promote.description) : ''}</div>
              <div class="img-wrap">
                <img class="img-responsive" src={about.promote.image.url} alt="" />
              </div>
              <div class="row">
                <div class="col-md-offset-2 col-md-8 text-justify">
                  {about.promote.sub_content ? ReactHtmlParser(about.promote.sub_content) : ''}
                  <div class="row">
                    {about.promote.store_section.map((item, index) => {
                      return (
                        <div class="col-sm-4 ">
                          <a href="#" className="icons-links">
                            <div class="icons-img-cont">
                              <img class="img-responsive" src={item.color_image.url} alt="color image" />
                              <img class="img-responsive" src={item.image.url} alt="image" />
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
                class="blockquote-wrap"
                style={{
                  'background-image': `url(${item.background_image.url})`,
                }}
              >
                <div class="background-overlay"></div>
                <div class="container">
                  <blockquote>
                    <p></p>
                    <p>{item.description ? ReactHtmlParser(item.description) : ''}</p>
                    <p></p>
                    <p class="speaker">{item.name}</p>
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
