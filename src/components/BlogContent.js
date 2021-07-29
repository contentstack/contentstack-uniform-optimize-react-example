// Blog Content Page or Read more page

/**
 * Module dependencies.
 */

import React, { Component } from "react";
import $ from "jquery";
import "../staticAssets/css/style.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../staticAssets/css/blogsection.css";
import BlogFooter from "./Blogfooter";

class BlogContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlState: this.props.match.url
    };
  }

  componentDidMount() {
    let url_path = this.props.match.url;
    var $header = $(".header-animated");
    var $logoAlt = $header.find(".logo > img").data("logo-alt"); // white logo
    var $logoDefault = $header.find(".logo > img").data("logo-default"); // black logo
    $(".header").css("display", "block");
    if (window.location.pathname === url_path) {
      $header.addClass("opaque");
      $header.find(".logo > img").attr("src", $logoDefault);
    } else {
      $header.removeClass("opaque");
      $header.find(".logo > img").attr("src", $logoAlt);
    }
  }

  render() {
    document.title = this.props.location.state.blog_title;
    return (
      <>
        <section class="team-wrap" id="blog_container">
          <div
            class="container"
            style={{
              display: "block",
              "justify-content": "center",
              margin: "auto",
              "text-align": "center",
              "margin-top": "5%"
            }}
          >
            <h2 class="color">
              <span>{this.props.location.state.blog_title}</span>
            </h2>
            <hr></hr>
            <img
              class="img-responsive"
              id="center"
              src={this.props.location.state.media.url}
              alt=""
            />
            <p>{this.props.location.state.blog_content}</p>
            <Link to={"/blog"}>Return back...</Link>
          </div>
        </section>
        <div className="card">
          <BlogFooter />
        </div>
        <Footer />
      </>
    );
  }
}

export default BlogContent;
