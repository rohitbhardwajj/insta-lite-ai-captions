import './Profile.css';
import axios from 'axios';
import React, { useState } from "react";

const Profile = () => {
  const [image, setImage] = useState(null);

  const createpost = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image); 

    try {
      const response = await axios.post('http://localhost:3000/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log("Response from backend:", response.data);
      alert(response.data.message || "Post created successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected image:", file);
    setImage(file);
  };

  return (
    <div className='profile-page'>
      <div className="head">
        <h1 className='name'>Hello Rohit</h1>
        <button>Log-out</button>
      </div>

      <div className="profile-page-mid">
        <h5>Create Post</h5>
        <input onChange={handleImageChange} type="file" accept="image/*" />
        <button onClick={createpost}>Create</button>
      </div>

      <div className="profile-end">
        <div className="post">
          <div className="img">
            <img
              src="https://thumbs.dreamstime.com/b/scenery-matterhorn-zermatt-switzerland-panoramic-view-gornergrat-390293648.jpg"
              alt=""
            />
          </div>
          <h4>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, officiis?</h4>
        </div>
      </div>
    </div>
  );
};

export default Profile;