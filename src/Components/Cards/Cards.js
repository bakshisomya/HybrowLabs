import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import SingleCard from "./SingleCard/SingleCard";

function Cards(props) {
  const [postsPerPage] = useState(5);
  const [offset, setOffset] = useState(1);
  const [posts, setAllPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [search, setsearch] = useState("");
  const [single, setsingle] = useState([]);

  const getPostData = (data) => {
    return data.map((pd) => <SingleCard key={pd.id} data={pd} />);
  };
  const getAllPosts = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    const data = res.data;
    const slice = data.slice(offset - 1, offset - 1 + postsPerPage);

    // For displaying Data
    const postData = getPostData(slice);

    // Using Hooks to set value
    setAllPosts(postData);
    setPageCount(Math.ceil(data.length / postsPerPage));
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage + 1);
  };
  const getData = async (search) => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${search}`
    );
    const data = res.data;
    setsingle(data);
  };
  console.log(single);
  const onSubmithandler = (event) => {
    event.preventDefault();
    getData(search.trim());
    setsearch("");
  };
  const onChangehandler = (event) => {
    setsearch(event.target.value);
  };
  useEffect(() => {
    getAllPosts();
  }, [offset]);
  let searched = "";
  if (single.length === 0) {
    searched = (
      <>
        {posts}
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </>
    );
  } else if (single) {
    searched = (
      <>
        <SingleCard key={single.id} data={single} />
        <button
          style={{
            padding: "0.5rem 1rem",
            marginTop: "1rem",
            border: "none",
            borderRadius: "10px",
          }}
          onClick={() => setsingle([])}
        >
          Go back
        </button>
      </>
    );
  }
  return (
    <div className="main-app">
      <form onSubmit={onSubmithandler}>
        <input
          onChange={onChangehandler}
          type="text"
          className="nav"
          name="search"
          placeholder="Search by id"
          value={search}
          autoComplete="off"
        />
        <i className="ion-ios-search search__icon"></i>
      </form>
      {/* Display all the posts */}
      {searched}
      {/* Using React Paginate */}
    </div>
  );
}

export default Cards;
