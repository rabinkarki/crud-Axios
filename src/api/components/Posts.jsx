import React, { useEffect, useState } from "react";
import { getPosts,deletePost} from "../postApi";
import Form from "./Form";

function Posts() {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});
  const getPostData = async () => {
    const res = await getPosts();
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatedPosts = data.filter((post) => post.id !== id);
        setData(newUpdatedPosts);
      } else {
        console.log("error in deleting message");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleUpdatePost = (curElem) => setUpdateDataApi(curElem);

  return (
    <>
      <section className="section-form">
        <Form
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </section>
      <section className="section-post">
        <ol>
          {data.map((postData) => {
            const { id, title, body } = postData;
            return (
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button onClick={() => handleUpdatePost(postData)}>Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletePost(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}

export default Posts;
