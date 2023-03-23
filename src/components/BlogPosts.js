import React, { useState, useEffect } from "react";
import BlogItems from "./BlogItems";
import "./css/BlogPosts.css";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const BlogPosts = (props) => {
  const [blogData, blogDataChange] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [sortType, setSortType] = useState("asc");
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const sortParam = ["author_name", "blogtitle", "thumbnail_text"];

  const totalBlogData = fetch("http://localhost:3001/blogData")
    .then((res) => res.json())
    .then((data) => {
      setTotalBlogs(data.length);
    })
    .catch((err) => {
      console.log(err.message);
    });

  const updateBlogs = async () => {
    let url = `http://localhost:3001/blogData?q=${value}&_page=${page}&_limit=${props.limit}&_sort=${sortValue}&_order=${sortType}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    blogDataChange(parsedData);
    setLoading(false);
    setTotalBlogs(parsedData.length);
  };

  useEffect(() => {
    updateBlogs();
    // eslint-disable-next-line
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (value !== "") {
      setPage(1);
      let url = `http://localhost:3001/blogData?q=${value}&_limit=${props.limit}&_sort=${sortValue}&_order=${sortType}`;
      alert(url);
      setLoading(true);
      let data = await fetch(url);
      let parsedData = await data.json();
      blogDataChange(parsedData);
      setPage(1);
      setLoading(false);
      setTotalBlogs(parsedData.length);
    } else {
      setPage(1);
      updateBlogs();
    }
  };

  const handleSort = async (e) => {
    let sortValue = e.target.value;
    setSortValue(sortValue);
    setPage(1);
    let url = `http://localhost:3001/blogData?q=${value}&_limit=${props.limit}&_sort=${sortValue}&_order=${sortType}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    blogDataChange(parsedData);
    setLoading(false);
    setTotalBlogs(parsedData.length);
  };

  const updateSortType = async (val) => {
    setPage(1);
    let url = `http://localhost:3001/blogData?q=${value}&_limit=${props.limit}&_sort=${sortValue}&_order=${val}`;
    setSortType(val);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    blogDataChange(parsedData);
    setLoading(false);
    setTotalBlogs(parsedData.length);
  };

  const fetchMoreData = async () => {
    let url = `http://localhost:3001/blogData?q=${value}&_page=${
      page + 1
    }&_limit=${props.limit}&_sort=${sortValue}&_order=${sortType}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    blogDataChange(blogData.concat(parsedData));
    setLoading(false);
    setTotalBlogs(parsedData.length);
    if (blogData.length === totalBlogs) {
      setPage(1);
    }
  };

  return (
    <>
      <h2
        style={{
          marginBottom: "35px",
          marginTop: "75px",
          textAlign: "center",
          color: props.mode === "light" ? "#102542" : "white",
        }}
      >{`BlogsMonkey - Top blog post Headlines`}</h2>
      <form className="container" onSubmit={handleSearch}>
        <div className="main-search-input-wrap">
          <div className="main-search-input fl-wrap">
            <div className="main-search-input-item">
              <input
                type="text"
                value={value}
                placeholder="Search Blogs..."
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <button
              className={
                props.mode === "dark"
                  ? "main-search-button btndark"
                  : "main-search-button"
              }
            >
              Search
            </button>
          </div>
        </div>
      </form>
      <div className="container ">
        <div className="row">
          <div className="col-8">
            <select
              style={{
                marginLeft: "10px",
                paddingLeft: "35px",
                width: "140%",
                borderRadius: "6px",
                height: "50px",
              }}
              onChange={handleSort}
              value={sortValue}
            >
              <option value="">
                <b>Please Select Value For Sorting</b>
              </option>
              {sortParam &&
                sortParam.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
          <div
            className="col-4"
            style={{
              paddingLeft: "140px",
              borderRadius: "6px",
              height: "30px",
            }}
          >
            <div className="btn-group-vertical">
              <button
                className={
                  props.mode === "dark" ? "btn btn-dark" : "btn btn-primary"
                }
                onClick={() => updateSortType("asc")}
                style={{ marginLeft: "3px", marginTop: "-18px" }}
              >
                Asc <span>&#8593;</span>
              </button>
              <button
                className={
                  props.mode === "dark" ? "btn btn-dark" : "btn btn-primary"
                }
                onClick={() => updateSortType("desc")}
                style={{ marginLeft: "3px", marginTop: "5px" }}
              >
                Desc<span>&#8595;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={blogData.length}
        next={fetchMoreData}
        hasMore={blogData.length !== totalBlogData}
        loader={loading && <Spinner />}
      >
        <div className="container">
          {blogData &&
            blogData.map((item, index) => (
              <div key={index}>
                {
                  <BlogItems
                    Mode={props.mode}
                    authorName={item.author_name ? item.author_name : ""}
                    blogTitle={
                      item.blogtitle ? item.blogtitle.slice(0, 22) : ""
                    }
                    description={
                      item.description ? item.description.slice(0, 60) : ""
                    }
                    authorAvatar={item.author_avatar}
                    imageUrl={item.image_url}
                    createdAt={item.created_at}
                    thumbnailText={item.thumbnail_text}
                  />
                }
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default BlogPosts;
