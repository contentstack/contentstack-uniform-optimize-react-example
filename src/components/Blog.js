// Blog Component

/**
 * Module dependencies.
 */

import React, { Component } from "react";
import "../staticAssets/css/style.css";
import "../staticAssets/css/blog.css";
import $ from "jquery";
import Stack from "./Helper";
import Footer from "./Footer";
import BlogFooter from "./Blogfooter";

class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogPage: ""
      // image: ""
    };
  }

  async componentDidMount() {
    try {
      let result = await Stack.getEntry('blog');
      console.log(result[0]);
      this.setState({
        blogPage: result[0],
      });
    } catch (err) {
      console.log(err);
    }

    var $header = $(".header-animated");
    var $logoDefault = $header.find(".logo > img").data("logo-default"); // black logo
    $(".header").css("display", "block");

    if (window.location.pathname === "/blog") {
      $(".header").addClass("opaque");
      $header.find(".logo > img").attr("src", $logoDefault);
    } else {
      $(".header").removeClass("opaque");
    }

    $(".dropdown").hover(
      function() {
        $(".dropdown").addClass("open");
      },
      function() {
        $(".dropdown").removeClass("open");
      }
    );
  }

  render() {
    if (this.state.blogPage !== "") {
      document.title = "Blog";
      return (
        <>
          <section>
            <div class="wrapper">
              <div class="main-container">
                <section class="team-wrap">
                  <div class="container">
                    <div
                      class="row"
                      style={{ "margin-top": "70px", "margin-bottom": "40px" }}
                    >
                      <div class="col-md-4 margin-top-33 margin-bottom">
                        <h1 id="welcome_header">WELCOME TO BLOG PAGE</h1>
                        <hr />
                        <div>
                          {this.state.blogPage.map(value => {
                            return (
                              <>
                                <h1
                                  style={{ cursor: "pointer" }}
                                  id="blog_title"
                                  onClick={() =>
                                    this.props.history.push(
                                      `/blog/${value.url.split("/")[1]}`,
                                      value
                                    )
                                  }
                                >
                                  <span className="spanTitle">
                                    {value.title}
                                  </span>
                                </h1>
                                <p class="content_style">
                                  {value.blog_content}
                                </p>{" "}
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    this.props.history.push(
                                      `/blog/${value.url.split("/")[1]}`,
                                      value
                                    )
                                  }
                                >
                                  Read More...
                                </span>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <div class="card">
                  <BlogFooter />
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </>
      );
    } else if (this.state.blogPage === "") {
      return null;
    }
  }
}

export default Blog;
