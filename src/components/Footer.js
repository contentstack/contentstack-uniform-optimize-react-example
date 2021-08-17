import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Stack from '../plugin/contentstack';

const Footer = () => {
  const [footer, setFooter] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        let result = await Stack.getEntry('footer');
        setFooter(result[0][0]);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  if (footer !== '') {
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="container">
            <div className="row">
              {footer.footer_section.footer_menu.map((menu, index) => {
                return (
                  <div className="col-sm-6 col-md-4" key={index}>
                    <h5>{menu.title}</h5>
                    {ReactHtmlParser(menu.footer_content)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <span>{footer.copy_rights ? ReactHtmlParser(footer.copy_rights) : ''}</span>
        </div>
      </footer>
    );
  } else {
    return null;
  }
};

export default Footer;
