import './Profile.css';
import axios from 'axios';
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/UserContext";

const Profile = () => {
  const [image, setImage] = useState(null);
  const [postData, setPostData] = useState([]);
  const { setIsUserLoggedIn } = useContext(UserContext);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchData = async () => {
    setLoadingPosts(true);
    try {
      const response = await axios.get('http://localhost:3000/api/post', {
        withCredentials: true
      });
      setPostData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createPost = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    setUploading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      alert(response.data.message || "Post created successfully!");
      fetchData();
    } catch (error) {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });
      setPostData([]);
      setIsUserLoggedIn(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className='profile-page'>
      <div className="head">
        <h1 className='name'>Hello</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="profile-page-mid">
        <h5>Create Post</h5>
        <input onChange={handleImageChange} type="file" accept="image/*" />
        <button onClick={createPost} disabled={uploading}>
          {uploading ? <div className="loader"></div> : "Create"}
        </button>
      </div>

      <div className="profile-end">
        {loadingPosts ? (
          <div className="loader"></div>
        ) : postData.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          postData.map((post, index) => {
            if (!post || !post.image) return null;

            const imageUrl = post.image.startsWith('http')
              ? post.image
              : `http://localhost:3000/${post.image}`;

            return (
              <div className="post" key={index}>
                <div className="img">
                  <img src={imageUrl} alt="uploaded" />
                </div>
                <h4>{post.caption || "No caption available"}</h4>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Profile;
