import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useBehaviorTracking } from '@uniformdev/optimize-tracker-react';
import Typed from 'react-typed';

function HeroBanner({ unfrm_opt_intent_tag, banner_image, rolling_text, title, description, cta }) {
  useBehaviorTracking(unfrm_opt_intent_tag);
  return (
    <div className="home-hero-bg hero-bg" style={{ backgroundImage: `url(${banner_image.url})` }} id="home">
      <div className="background-overlay"></div>
      <div className="aligned-container typed-container">
        <div className="container">
          <div className="typing-block">
            <div className="typing-block">
              {title}{' '}
              <span>
                {' '}
                <Typed strings={[`${rolling_text}`]} typeSpeed={50} />{' '}
              </span>
            </div>
          </div>
          {ReactHtmlParser(description)}
          <a href="#" className="btn btn-primary mrm">
            {cta.title}
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
