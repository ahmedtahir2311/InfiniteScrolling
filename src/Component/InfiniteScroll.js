import axios from "axios";
import React, { useEffect, useState } from "react";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);

  const [pageNo, setPageNo] = useState(1);

  const getData = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${pageNo}/photos`)
      .then((response) => {
        if (pageNo > 1) {
          let arr = [...data, ...response.data];

          setData(arr);
        } else {
          setData(response.data);
        }
      })
      .catch((error) => {
        alert("Axios GET request failed");
      });
  };

  const firstEvent = (e) => {
    // console.log(e.target.scrollHeight);
    // console.log(e.target.scrollTop);
    // console.log(e.target.clientHeight);

    var bottom =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 40;
    if (bottom) {
      let pg = pageNo + 1;
      setPageNo(pg);
      getData();
    }
  };
  useEffect(() => {
    getData();
    // document
    //   .getElementsByClassName("ImageAPI")[0]
    //   .addEventListener("scroll", firstEvent);
  }, []);
  return (
    <div
      onScroll={firstEvent}
      className="ImageAPI"
      style={{ height: "600px", overflowY: "auto" }}
    >
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Photo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>
                  <img src={item.thumbnailUrl} alt="" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InfiniteScroll;
