import React, { useState, useEffect } from 'react';

import ReactHtmlParser from 'react-html-parser';
import lodash from 'lodash';
import 'react-modal-video/scss/modal-video.scss';
import ModalVideo from 'react-modal-video';
import $ from 'jquery';
import Stack from '../plugin/contentstack';

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

  // animations hooks
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

  const openModal = () => setIsOpen(true);

  if (!features) return null;
  document.title = features.title;
  const {
    advantages: {
      advantages: [{ title: title1, description: description1 }, { title: title2, description: description2 }, { title: title3, description: description3 }, { title: title4, description: description4 }],
      content: { content },
      tab_section: [
        {
          description: descriptionOne,
          image: { url: imageOne },
          cta: [{ title: getDetails }, { title: seeMore }],
        },
        {
          description: descriptionTwo,
          image: { url: imageTwo },
        },
        {
          description: descriptionThree,
          image: { url: imageThree },
        },
      ],
    },
    video_section,
  } = features;

  return (
    <div>
      <div className='main-container'>
        <section className='advantages-wrap margin-top-max'>
          <div className='container'>
            <div className='text-center'>{content ? ReactHtmlParser(content) : ''}</div>
            <div className='row text-center'>
              <div className='col-md-3 col-xs-6 icon-wrap'>
                <i className='icon-responsive fa-4x'></i>
                <h4>
                  <strong>{title1 ? title1 : ''}</strong>
                </h4>
                <p className='text-center'></p>
                {description1 ? ReactHtmlParser(description1) : ''}
                <p></p>
              </div>
              <div className='col-md-3 col-xs-6 icon-wrap'>
                <i className='icon-clean-code fa-4x'></i>
                <h4>
                  <strong>{title2 ? title2 : ''}</strong>
                </h4>
                <p className='text-center'></p>
                {description2 ? ReactHtmlParser(description2) : ''}
                <p></p>
              </div>
              <div className='col-md-3 col-xs-6 icon-wrap'>
                <i className='icon-ui-design fa-4x'></i>
                <h4>
                  <strong>{title3 ? title3 : ''}</strong>
                </h4>
                <p className='text-center'></p>
                {description3 ? ReactHtmlParser(description3) : ''}
                <p></p>
              </div>
              <div className='col-md-3 col-xs-6 icon-wrap'>
                <i className='icon-for-business fa-4x'></i>
                <h4>
                  <strong>{title4 ? title4 : ''}</strong>
                </h4>
                <p className='text-center'></p>
                {description4 ? ReactHtmlParser(description4) : ''}
                <p></p>
              </div>
            </div>
          </div>
        </section>
        <section className='tab-container margin-top-max margin-bottom-max' id='tabs'>
          <div className='container text-center'>
            <ul className='nav nav-tabs'>
              {features.advantages.tab_section.map(({ title }, index) => {
                if (title === 'Prototype') {
                  return (
                    <li className='active' key={index}>
                      <a href='#tab1' data-toggle='tab' aria-expanded='true'>
                        {title}
                      </a>
                    </li>
                  );
                } else if (title === 'UI Design') {
                  return (
                    <li className='' key={index}>
                      <a href='#tab2' data-toggle='tab' aria-expanded='false'>
                        {title}
                      </a>
                    </li>
                  );
                } else if (title !== 'Prototype' && title !== 'UI Design') {
                  return (
                    <li className='' key={index}>
                      <a href='#tab3' data-toggle='tab' aria-expanded='false'>
                        {title}
                      </a>
                    </li>
                  );
                }
              })}
            </ul>
            <div className='row'>
              {/* <!-- Tab panes --> */}
              <div className='tab-content'>
                <div className='tab-pane fade active in' id='tab1'>
                  <div className='col-md-6 col-sm-6 col-sm-push-6 text-left animated fadeInRight'>
                    <img className='img-responsive' src={imageOne ? imageOne : ''} alt='image' />
                  </div>
                  <div className='col-md-6 col-sm-6 col-sm-pull-6 text-left animated fadeInLeft'>
                    {descriptionOne ? ReactHtmlParser(descriptionOne) : ''}
                    <a href='#' className='btn btn-primary mrl'>
                      {getDetails ? getDetails : ''}
                    </a>
                    <a href='#' className='btn btn-secondary'>
                      {seeMore ? seeMore : ''}
                    </a>
                  </div>
                </div>
                <div className='tab-pane fade' id='tab2'>
                  <div className='col-md-6 col-sm-6 col-sm-push-6 text-left animated fadeInRight'>
                    <img className='img-responsive' src={imageTwo ? imageTwo : ''} alt='image' />
                  </div>
                  <div className='col-md-6 col-sm-6 col-sm-pull-6 text-left animated fadeInLeft'>
                    {descriptionTwo ? ReactHtmlParser(descriptionTwo) : ''}
                    <a href='#' className='btn btn-primary mrl'>
                      {getDetails ? getDetails : ''}
                    </a>
                    <a href='#' className='btn btn-secondary'>
                      {seeMore ? seeMore : ''}
                    </a>
                  </div>
                </div>
                <div className='tab-pane fade' id='tab3'>
                  <div className='col-md-6 col-sm-6 col-sm-push-6 text-left animated fadeInRight'>
                    <img className='img-responsive' src={imageThree ? imageThree : ''} alt='image' />
                  </div>
                  <div className='col-md-6 col-sm-6 col-sm-pull-6 text-left animated fadeInLeft'>
                    {descriptionThree ? ReactHtmlParser(descriptionThree) : ''}
                    <a href='#' className='btn btn-primary mrl'>
                      {getDetails ? getDetails : ''}
                    </a>
                    <a href='#' className='btn btn-secondary'>
                      {seeMore ? seeMore : ''}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className='video-wrap'
          style={{
            backgroundImage: `url(${video_section.image.url ? video_section.image.url : ''})`,
          }}
        >
          <div className='background-overlay'></div>
          <span onClick={openModal} className='fa fa-play' data-toggle='modal' data-target='#videoModal'></span>
        </div>
      </div>
      <ModalVideo ratio='21:10' channel='youtube' isOpen={isOpen} videoId='aywP_ozA2NY' onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Features;
