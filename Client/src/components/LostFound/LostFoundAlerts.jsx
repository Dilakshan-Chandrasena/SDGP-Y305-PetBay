import styles from "./lostfound.module.css";
import Filters from "./Filters";
import { useState, useEffect } from "react";
import NoticeCard from "./NoticeCard";
import axios from "axios";
import AddPost from "./AddLostFoundModal";
import EmptyRecords from "./EmptyRecords/EmptyRecords";
import Pagination from "react-bootstrap/Pagination";

export default function LostFoundAlerts() {
  const base_url =
    import.meta.env.VITE_SERVER_NODE_ENV === "development"
      ? import.meta.env.VITE_LOCAL_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;

  const [lostFoundDetails, setLostFoundDetails] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEmptyRecs, setShowEmptyRecs] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const res = await axios.get(
        `${base_url}/petbay/api/v1/lost-found/lost-found-posts`
      );
      const data = res.data;
      if (data.length > 0) {
        setShowEmptyRecs(false);
        setLostFoundDetails(res.data);
        setFilteredPosts(res.data);
        setLoading(false);
      } else {
        setShowEmptyRecs(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleFilterChange = (filter) => {
    if (filter === "all") {
      setFilteredPosts(lostFoundDetails);
    } else {
      const filtered = lostFoundDetails.filter(
        (post) => post.status.toLowerCase() === filter
      );
      setFilteredPosts(filtered);
      setShowEmptyRecs(filtered.length === 0);
    }
    setCurrentPage(1); // Reset to first page when applying filter
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-sm-3">
            {" "}
            {/* Adjusted column size for small screens */}
            <Filters onFilterChange={handleFilterChange} />
            <AddPost reloadLostFoundPosts={getAllPosts} />
            <div>
              {currentPosts.map((post) => (
                <NoticeCard data={post} key={post.id} />
              ))}
            </div>
            <div style={{ marginTop: "50px" }}>
              <Pagination>
                <Pagination.Prev
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      prevPage === 1 ? prevPage : prevPage - 1
                    )
                  }
                />
                {[
                  ...Array(
                    Math.ceil(filteredPosts.length / postsPerPage)
                  ).keys(),
                ].map((num) => (
                  <Pagination.Item
                    key={num + 1}
                    active={num + 1 === currentPage}
                    onClick={() => setCurrentPage(num + 1)}
                  >
                    {num + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      prevPage ===
                      Math.ceil(filteredPosts.length / postsPerPage)
                        ? prevPage
                        : prevPage + 1
                    )
                  }
                />
              </Pagination>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          visibility: showEmptyRecs ? "visible" : "hidden",
          height: showEmptyRecs ? "fit-content" : "0px",
        }}
      >
        <EmptyRecords key={""} emptyProperty={"Pets"} />
      </div>
    </div>
  );
}
