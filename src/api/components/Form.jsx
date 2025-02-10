import React, { useEffect, useState } from "react";
import { postData, updatePost } from "../postApi";

function Form({ data, setData, updateDataApi, setUpdateDataApi }) {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });
  let isEmpty = Object.keys(updateDataApi).length === 0;
  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title,
        body: updateDataApi.body,
      });
    const handleAddData = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setAddData((prev) => {
        return { 
            ...prev,
             [name]: value };
      });
    };
    const addPostData = async () => {
        const res=await postData(addData);
        if (res.status===201){
            setData([...data,res.data]);
            setAddData({
                title:"",
                body:""
            })
        }
    };
    const handleUpdatePost=async()=>{
        const res= await updatePost(addData);
        if (res.status===200){
            setUpdateDataApi()
        }
    }
  });
  return <div>Form</div>;
}

export default Form;
