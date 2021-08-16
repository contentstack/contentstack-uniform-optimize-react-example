import React, { useState, useEffect } from 'react';

import ReactHtmlParser from 'react-html-parser';
import 'react-modal-video/scss/modal-video.scss';
import ModalVideo from 'react-modal-video';
import $ from 'jquery';
import Stack from '../plugin/Helper';

const Features = () => {
  const [features, setFeatures] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // fetch data
  useEffect(() => {
    const getData = async () => {
      try {
        let result = await Stack.getEntry('feature_page');
        setFeatures(result[0][0]);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  //   animations hooks
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

  const openModal = () => {
    setIsOpen(true);
  };

  if (features !== '') {
    document.title = features.title;
    return (
      <>
        <div className="main-container">
          <section className="advantages-wrap margin-top-max">
            <div className="container">
              <div className="text-center">{features.advantages.content ? ReactHtmlParser(features.advantages.content) : ''}</div>
              <div className="row text-center">
                <div className="col-md-3 col-xs-6 icon-wrap">
                  <i className="icon-responsive fa-4x"></i>
                  <h4>
                    <strong>{features.advantages.advantages[0].title ? features.advantages.advantages[0].title : ''}</strong>
                  </h4>
                  <p className="text-center"></p>
                  {features.advantages.advantages[0].description ? ReactHtmlParser(features.advantages.advantages[0].description) : ''}
                  <p></p>
                </div>
                <div className="col-md-3 col-xs-6 icon-wrap">
                  <i className="icon-clean-code fa-4x"></i>
                  <h4>
                    <strong>{features.advantages.advantages[1].title ? features.advantages.advantages[1].title : ''}</strong>
                  </h4>
                  <p className="text-center"></p>
                  {features.advantages.advantages[1].description ? ReactHtmlParser(features.advantages.advantages[1].description) : ''}
                  <p></p>
                </div>
                <div className="col-md-3 col-xs-6 icon-wrap">
                  <i className="icon-ui-design fa-4x"></i>
                  <h4>
                    <strong>{features.advantages.advantages[2].title ? features.advantages.advantages[2].title : ''}</strong>
                  </h4>
                  <p className="text-center"></p>
                  {features.advantages.advantages[2].description ? ReactHtmlParser(features.advantages.advantages[2].description) : ''}
                  <p></p>
                </div>
                <div className="col-md-3 col-xs-6 icon-wrap">
                  <i className="icon-for-business fa-4x"></i>
                  <h4>
                    <strong>{features.advantages.advantages[3].title ? features.advantages.advantages[3].title : ''}</strong>
                  </h4>
                  <p className="text-center"></p>
                  {features.advantages.advantages[3].description ? ReactHtmlParser(features.advantages.advantages[3].description) : ''}
                  <p></p>
                </div>
              </div>
            </div>
          </section>
          <section className="tab-container margin-top-max margin-bottom-max" id="tabs">
            <div className="container text-center">
              <ul className="nav nav-tabs">
                {features.advantages.tab_section.map((tab, index) => {
                  if (tab.title === 'Prototype') {
                    return (
                      <li className="active" key={index}>
                        <a href="#tab1" data-toggle="tab" aria-expanded="true">
                          {tab.title}
                        </a>
                      </li>
                    );
                  } else if (tab.title === 'UI Design') {
                    return (
                      <li className="" key={index}>
                        <a href="#tab2" data-toggle="tab" aria-expanded="false">
                          {tab.title}
                        </a>
                      </li>
                    );
                  } else if (tab.title !== 'Prototype' && tab.title !== 'UI Design') {
                    return (
                      <li className="" key={index}>
                        <a href="#tab3" data-toggle="tab" aria-expanded="false">
                          {tab.title}
                        </a>
                      </li>
                    );
                  }
                })}
              </ul>
              <div className="row">
                {/* <!-- Tab panes --> */}
                <div className="tab-content">
                  <div className="tab-pane fade active in" id="tab1">
                    <div className="col-md-6 col-sm-6 col-sm-push-6 text-left animated fadeInRight">
                      <img className="img-responsive" src={features.advantages.tab_section[0].image.url ? features.advantages.tab_section[0].image.url : ''} alt="image" />
                    </div>
                    <div className="col-md-6 col-sm-6 col-sm-pull-6 text-left animated fadeInLeft">
                      {features.advantages.tab_section[0].description ? ReactHtmlParser(features.advantages.tab_section[0].description) : ''}
                      <a href="#" className="btn btn-primary mrl">
                        {features.advantages.tab_section[0].cta[0].title ? features.advantages.tab_section[0].cta[0].title : ''}
                      </a>
                      <a href="#" className="btn btn-secondary">
                        {features.advantages.tab_section[1].cta[1].title ? features.advantages.tab_section[1].cta[1].title : ''}
                      </a>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="tab2">
                    <div className="col-md-6 col-sm-6 col-sm-push-6 text-left animated fadeInRight">
                      <img className="img-responsive" src={features.advantages.tab_section[1].image.url ? features.advantages.tab_section[1].image.url : ''} alt="image" />
                    </div>
                    <div className="col-md-6 col-sm-6 col-sm-pull-6 text-left animated fadeInLeft">
                      {features.advantages.tab_section[1].description ? ReactHtmlParser(features.advantages.tab_section[1].description) : ''}
                      <a href="#" className="btn btn-primary mrl">
                        {features.advantages.tab_section[0].cta[0].title ? features.advantages.tab_section[0].cta[0].title : ''}
                      </a>
                      <a href="#" className="btn btn-secondary">
                        {features.advantages.tab_section[1].cta[1].title ? features.advantages.tab_section[1].cta[1].title : ''}
                      </a>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="tab3">
                    <div className="col-md-6 col-sm-6 col-sm-push-6 text-left animated fadeInRight">
                      <img className="img-responsive" src={features.advantages.tab_section[2].image.url ? features.advantages.tab_section[2].image.url : ''} alt="image" />
                    </div>
                    <div className="col-md-6 col-sm-6 col-sm-pull-6 text-left animated fadeInLeft">
                      {features.advantages.tab_section[2].description ? ReactHtmlParser(features.advantages.tab_section[2].description) : ''}
                      <a href="#" className="btn btn-primary mrl">
                        {features.advantages.tab_section[0].cta[0].title ? features.advantages.tab_section[0].cta[0].title : ''}
                      </a>
                      <a href="#" className="btn btn-secondary">
                        {features.advantages.tab_section[1].cta[1].title ? features.advantages.tab_section[1].cta[1].title : ''}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div
            className="video-wrap"
            style={{
              'backgroundImage': `url(${features.video_section.image.url ? features.video_section.image.url : ''})`,
            }}
          >
            <div className="background-overlay"></div>
            <span onClick={openModal} className="fa fa-play" data-toggle="modal" data-target="#videoModal"></span>
          </div>
        </div>
        <ModalVideo ratio="21:10" channel="youtube" isOpen={isOpen} videoId="aywP_ozA2NY" onClose={() => setIsOpen(false)} />
      </>
    );
  } else {
    return null;
  }
};

export default Features;
