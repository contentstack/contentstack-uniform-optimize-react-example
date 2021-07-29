// Footer Component

/**
 * Module dependencies.
 */

import React, { Component } from "react";
import "../staticAssets/css/font-awesome.css";
import ReactHtmlParser from "react-html-parser";
import Stack from "./Helper";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footer: ""
    };
  }

  async componentDidMount() {
    try {
      let result = await Stack.getEntry('footer');
      this.setState({
        footer: result[0][0],
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.footer !== "") {
      const blockOne = this.state.footer.footer_section
        .footer_menu[0].footer_content;
      const blockTwo = this.state.footer.footer_section
        .footer_menu[1].footer_content;
      const blockThree = this.state.footer.footer_section
        .footer_menu[2].footer_content;
      const copyright = this.state.footer.copy_rights;

      return (
        <footer className="footer">
          <div className="footer-content">
            <div className="container">
              <div className="row">
                <div className="col-sm-6 col-md-4">
                  <h5>
                    {
                      this.state.footer.footer_section.footer_menu[0]
                        .title
                    }
                  </h5>
                  {ReactHtmlParser(blockOne)}
                </div>
                <div className="col-sm-6 col-md-4">
                  <h5>
                    {
                      this.state.footer.footer_section.footer_menu[1]
                        .title
                    }
                  </h5>{" "}
                  {ReactHtmlParser(blockTwo)}
                </div>
                <div className="col-sm-6 col-md-4">
                  <h5>
                    {
                      this.state.footer.footer_section.footer_menu[2]
                        .title
                    }
                  </h5>{" "}
                  {ReactHtmlParser(blockThree)}
                </div>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <span>{ReactHtmlParser(copyright)}</span>
          </div>
        </footer>
      );
    } else {
      return null;
    }
  }
}

export default Footer;
