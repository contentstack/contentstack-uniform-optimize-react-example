// Blog Footer description Component

/**
 * Module dependencies.
 */

import React, { Component } from "react";
import "../staticAssets/css/style.css";
import "../staticAssets/css/blog.css";
import Stack from "./Helper";

class Blogfooter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: ""
    };
  }

  async componentDidMount() {
    try {
      let result = await Stack.getEntry('blog_page_image');
      this.setState({
        image: result[0][0],
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.image !== "") {
      return (
        <div>
          <h3>{this.state.image.blog_footer_section}</h3>
          <p>{this.state.image.blog_footer_description}</p>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Blogfooter;
