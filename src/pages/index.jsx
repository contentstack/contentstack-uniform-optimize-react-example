import React, { useState, useEffect } from 'react';
import lodash from 'lodash';

import HeroBanner from '../components/HeroBanner';
import $ from 'jquery';
import Stack from '../plugin/contentstack';

import { contentstackOptimizeListReader } from '@uniformdev/optimize-tracker-contentstack';
import { Personalize } from '@uniformdev/optimize-tracker-react';

const Home = () => {
  const [home, setHome] = useState({});

  // data fetch hook
  useEffect(() => {
    const getData = async () => {
      try {
        let result = await Stack.getEntry('home', ['hero_banner']);
        setHome(result[0][0]);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  // animations hook
  useEffect(() => {
    const relativePath = lodash.get(window, 'location.pathname');
    let $header = $('.header-animated');
    let $logoAlt = $header.find('.logo > img').data('logo-alt'); // white logo
    let $logoDefault = $header.find('.logo > img').data('logo-default'); // black logo
    $('.header').css('display', 'block');

    if (relativePath !== '/features' && relativePath !== '/about') {
      $header.removeClass('opaque');
      $header.find('.logo > img').attr('src', $logoAlt);
    }

    $(window).on('scroll', function () {
      let scroll = $(window).scrollTop();
      const {
        location: { pathname },
      } = window;
      if (pathname !== '/features' && pathname !== '/about') {
        if (scroll > 100) {
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
  });
  const { title, url } = home;
  if (!title || !url) return null;
  document.title = home.title;
  const variations = contentstackOptimizeListReader(home.hero_banner);
  return (
    <div>
      <section>
        <div className='wrapper'>
          <Personalize name='Personalized Hero' variations={variations} component={HeroBanner} />
          <div className='main-container'></div>
        </div>
        <div className='modal videoModal fade' id='videoModal' tabIndex='-1' role='dialog' aria-hidden='true'>
          <div className='modal-dialog modal-lg'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>×</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
