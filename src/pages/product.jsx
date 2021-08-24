import React, { useState, useEffect } from 'react';
import lodash from 'lodash';

import ReactHtmlParser from 'react-html-parser';
import $ from 'jquery';
import Stack from '../plugin/contentstack';

const Product = () => {
  const [product, setProduct] = useState('');

  // data fetch hook
  useEffect(() => {
    const getData = async () => {
      try {
        let result = await Stack.getEntry('product');
        setProduct(result[0][0]);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  // animation hook
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

  if (!product) return null;
  document.title = product.title;
  const { banner, right_sources, real_data, try_now, products, process_communication } = product;
  return (
    <div>
      <section>
        <div
          className='product-hero-bg hero-bg'
          style={{
            backgroundImage: `url(${banner[0].banner_img.url ? banner[0].banner_img.url : ''}))`,
          }}
        >
          <div className='aligned-container typed-container text-center'>
            <div className='container'>
              {banner.map(({ description, cta }, index) => {
                return (
                  <div key={index}>
                    <p>{ReactHtmlParser(description)}</p>
                    <a href='/' className='btn btn-primary mrm'>
                      {cta.link}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className='main-container'>
          <section className='margin-top-max'>
            <div className='container'>
              {right_sources.content ? ReactHtmlParser(right_sources.content) : ''}
              <div className='row'>
                {right_sources.right_sources_content.map((item, index) => {
                  return (
                    <div key={index} className='col-md-4 col-xs-12 text-center icon-wrap'>
                      <h4>
                        <strong>{item.title}</strong>
                      </h4>
                      <p>{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='row border-bottom'>
              <div className='container feedback-wrap'>
                <img className='img-responsive' src={right_sources.image.url ? right_sources.image.url : ''} alt='right sources' />
              </div>
            </div>
          </section>

          <section className='margin-top-max margin-bottom-max'>
            <div className='container'>
              {real_data.content ? ReactHtmlParser(real_data.content) : ''}
              <div className='row'>
                <div className='col-md-6 text-left padding-right-max'>
                  {real_data.real_data_content.map((item, index) => {
                    const { title, description } = item;
                    return (
                      <div key={index}>
                        <h4>
                          <strong>{title}</strong>
                        </h4>
                        <p className='mbl'>{description}</p>
                      </div>
                    );
                  })}
                </div>

                <div className='col-md-6'>
                  <img className='img-responsive' src={product.real_data.image.url ? product.real_data.image.url : ''} alt='real data' />
                </div>
              </div>
            </div>
          </section>

          <div className='action-wrap'>
            <div className='container text-center'>
              <h2 className='mbm'>{product.see_it_in_action.content ? product.see_it_in_action.content : ''}</h2>
              <a href='' className='btn btn-primary'>
                {product.see_it_in_action.cta.tilte ? product.see_it_in_action.cta.tilte : ''}
              </a>
            </div>
          </div>

          <section className='margin-top-max margin-bottom-max border-bottom'>
            <div className='container'>
              {process_communication.head_content ? ReactHtmlParser(process_communication.head_content) : ''}
              <div className='row'>
                <div className='col-md-6'>
                  <img className='img-responsive' src={process_communication.image.url ? process_communication.image.url : ''} alt='communication' />
                </div>
                <div className='col-md-6 text-left padding-left-max'>
                  {process_communication.process_content.map((item, index) => {
                    return (
                      <div key={index}>
                        <h4>
                          <strong>{item.title}</strong>
                        </h4>
                        <p className='mbl'>{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className='pricing  margin-bottom-max'>
            <div className='container text-center'>
              {products.content ? ReactHtmlParser(products.content) : ''}

              <div className='margin-top-max'>
                <a href='#' className='btn btn-primary'>
                  {products.cta.title ? products.cta.title : ''}
                </a>
              </div>
              <div className='row'>
                {products.plans.map(({ amount, title, label, features }, index) => {
                  return (
                    <div className='col-md-4 col-sm-4' key={index}>
                      <div className='prices price-1'>
                        <div className='price-inner'>
                          <h3>{title}</h3>
                          {}
                          <div className='cost-line'>{ReactHtmlParser(amount)}</div>
                          <p>{label}</p>
                        </div>
                        {ReactHtmlParser(features)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <div className='stay-tune-wrap'>
            <div className='container text-center'>
              <a href='#' className='btn btn-tertiary'>
                {try_now.cta.title ? try_now.cta.title : ''}
              </a>
              {try_now.content ? ReactHtmlParser(try_now.content) : ''}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
