import React, { useState, useEffect } from 'react';

import ReactHtmlParser from 'react-html-parser';
import $ from 'jquery';
import Stack from '../plugin/Helper';

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
    let $header = $('.header-animated');
    let $logoAlt = $header.find('.logo > img').data('logo-alt'); // white logo
    let $logoDefault = $header.find('.logo > img').data('logo-default'); // black logo
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
  });

  if (product !== '') {
    document.title = product.title;

    return (
      <div>
        <section>
          <div
            className="product-hero-bg hero-bg"
            style={{
              'backgroundImage': `url(${product.banner[0].banner_img.url ? product.banner[0].banner_img.url : ''}))`,
            }}
          >
            <div className="aligned-container typed-container text-center">
              <div className="container">
                {product.banner.map((item, index) => {
                  return (
                    <>
                      <div>{ReactHtmlParser(item.description)}</div>
                      <a href="/" className="btn btn-primary mrm">
                        {item.cta.link}
                      </a>
                    </>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="main-container">
            <section className="margin-top-max">
              <div className="container">
                {product.right_sources.content ? ReactHtmlParser(product.right_sources.content) : ''}
                <div className="row">
                  {product.right_sources.right_sources_content.map((item, index) => {
                    return (
                      <div className="col-md-4 col-xs-12 text-center icon-wrap">
                        <h4>
                          <strong>{item.title}</strong>
                        </h4>
                        <p>{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="row border-bottom">
                <div className="container feedback-wrap">
                  <img className="img-responsive" src={product.right_sources.image.url ? product.right_sources.image.url : ''} alt="right sources" />
                </div>
              </div>
            </section>

            <section className="margin-top-max margin-bottom-max">
              <div className="container">
                {product.real_data.content ? ReactHtmlParser(product.real_data.content) : ''}
                <div className="row">
                  <div className="col-md-6 text-left padding-right-max">
                    {product.real_data.real_data_content.map((item, index) => {
                      return (
                        <>
                          <h4>
                            <strong>{item.title}</strong>
                          </h4>
                          <p className="mbl">{item.description}</p>
                        </>
                      );
                    })}
                  </div>

                  <div className="col-md-6">
                    <img className="img-responsive" src={product.real_data.image.url ? product.real_data.image.url : ''} alt="real data" />
                  </div>
                </div>
              </div>
            </section>

            <div className="action-wrap">
              <div className="container text-center">
                <h2 className="mbm">{product.see_it_in_action.content ? product.see_it_in_action.content : ''}</h2>
                <a href="" className="btn btn-primary">
                  {product.see_it_in_action.cta.tilte ? product.see_it_in_action.cta.tilte : ''}
                </a>
              </div>
            </div>

            <section className="margin-top-max margin-bottom-max border-bottom">
              <div className="container">
                {product.process_communication.head_content ? ReactHtmlParser(product.process_communication.head_content) : ''}
                <div className="row">
                  <div className="col-md-6">
                    <img className="img-responsive" src={product.process_communication.image.url ? product.process_communication.image.url : ''} alt="communication" />
                  </div>
                  <div className="col-md-6 text-left padding-left-max">
                    {product.process_communication.process_content.map((item, index) => {
                      return (
                        <>
                          <h4>
                            <strong>{item.title}</strong>
                          </h4>
                          <p className="mbl">{item.description}</p>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <section className="pricing  margin-bottom-max">
              <div className="container text-center">
                {product.products.content ? ReactHtmlParser(product.products.content) : ''}

                <div className="margin-top-max">
                  <a href="#" className="btn btn-primary">
                    {product.products.cta.title ? product.products.cta.title : ''}
                  </a>
                </div>
                <div className="row">
                  {product.products.plans.map((item, index) => {
                    return (
                      <div className="col-md-4 col-sm-4">
                        <div className="prices price-1">
                          <div className="price-inner">
                            <h3>{item.title}</h3>
                            {}
                            <div className="cost-line">{ReactHtmlParser(item.amount)}</div>
                            <p>{item.label}</p>
                          </div>
                          {ReactHtmlParser(item.features)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <div className="stay-tune-wrap">
              <div className="container text-center">
                <a href="#" className="btn btn-tertiary">
                  {product.try_now.cta.title ? product.try_now.cta.title : ''}
                </a>
                {product.try_now.content ? ReactHtmlParser(product.try_now.content) : ''}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } else if (product === '') {
    return null;
  }
};

export default Product;
