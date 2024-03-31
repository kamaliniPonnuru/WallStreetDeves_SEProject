import React, { useState, useEffect } from "react";
import axios from "axios";

function ReportedPosts() {
  const [reportedPosts, setReportedPosts] = useState([]);
  const [filter, setFilter] = useState("asc");

  useEffect(() => {
    const fetchReportedPosts = async () => {
      try {
        const response = await axios.get("/post-api/reportedposts");
        setReportedPosts(response.data);
      } catch (error) {
        console.error("Error fetching reported posts:", error);
      }
    };

    fetchReportedPosts();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const sortedReportedPosts = reportedPosts.sort((a, b) => {
    if (filter === "asc") {
      return a.count - b.count;
    } else {
      return b.count - a.count;
    }
  });

  return (
    <div>
      <h2>Reported Posts</h2>
      <select value={filter} onChange={handleFilterChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <ul>
        {sortedReportedPosts.map((report) => (
          <li key={report._id}>
            <p>Title: {report.post.title}</p>
            <p>Content: {report.post.content}</p>
            <p>Category: {report.post.category}</p>
            <p>Visibility: {report.post.visibility}</p>
            <p>Created By: {report.post.createdBy}</p>
            <p>Report Count: {report.count}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportedPosts;
