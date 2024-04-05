import React, { useState } from 'react';
import axios from 'axios';
import './TempPost.css';
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";
import { TfiComments } from "react-icons/tfi";

const TempPost = ({ post }) => {

  const [liked, setLiked] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [comment, setComment] = useState('');


  const handleChange = (event) => {
    setComment(event.target.value);
  };
  
  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  const handleLikeClick = (postId) => {
    console.log("handleLikeClick")
    if (liked) {
      setLiked(false);
      // handleUnlike(postId);
    } else {
      setLiked(true);
      // handleLike(postId);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.get(`/increaselike/${postId}`);
      if (response.status === 200) {
        console.log(response.data.message);
        setLiked(true);
      } else {
        console.error('Error increasing like count:', response.statusText);
      }
    } catch (error) {
      console.error('Error increasing like count:', error);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      const response = await axios.get(`/decreaselike/${postId}`);

      if (response.status === 200) {
        console.log(response.data.message);
        setLiked(false);
      } else {
        console.error('Error decreasing like count:', response.statusText);
      }
    } catch (error) {
      console.error('Error decreasing like count:', error);
    }
  };
  const handleCommentSubmit = async () => {
      console.log("handling comment");
  }
  
  return (
    <div className="temp_post-container">
      <h3 className="temp_post-title">{post.title}
      </h3>
      <p className="temp_post-likes">{post.content}</p>
      {/* <button onClick={handleLikeClick(post._id)}>{liked ? <AiTwotoneLike /> : <AiFillLike />}</button> */}
      
      <div>
      {liked ? (
        <button onClick={() => handleLikeClick(post._id)}><FcLike /></button>
      ) : (
        <button onClick={() => handleLikeClick(post._id)}><CiHeart /></button>
      )}
    <p className="temp_post-likes">Likes: {post.likes}</p>

      <button onClick={toggleDialog}>
      <TfiComments />
      </button>
      {showDialog && (
        <div className="temp_dialog-overlay">
          <div className="temp_dialog">
            <h2>Comments</h2>
            {
                        // post.comments.map( (comment) => (
                        //     <h2>{comment.content}</h2>       
                        // ))
                        <div>
                        <p>Comment 1</p>
                        <p>Comment 2</p>
                        </div>
            }
            <form onSubmit={handleCommentSubmit}>
                      <textarea
                        value={comment}
                        onChange={handleChange}
                        placeholder="Write your comment..."
                        rows={4}
                        cols={50}
                      />
                      <br />
                      <button className="temp_like-button" type="submit">Submit</button>
                    </form>
            <button className="temp_like-button" onClick={toggleDialog}>Close</button>
          </div>
        </div>
      
      )}
      </div>
        
    </div>
  );
};

export default TempPost;
