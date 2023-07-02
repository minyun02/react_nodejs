import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

  const [ListOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/posts",
    { headers: {
      accessToken: localStorage.getItem("accessToken")
      }
    }).then((response) => {
      setListOfPosts(response.data.listOfPosts);
      setLikedPosts(response.data.likedPosts.map((like) => {
        return like.PostId;
      }));
    });
  }, []);

  const likeAPost = (postId) => {
    axios.post(
      "http://localhost:3001/likes",
      { PostId: postId }, 
      { headers: {
        accessToken: localStorage.getItem("accessToken")
        }
      }).then((response) => {
        setListOfPosts(
          ListOfPosts.map((post) => {
            if(post.id === postId) {
              if(response.data.liked) {
                return {...post, Likes: [...post.Likes, 0]};
              } else {
                const likeArray = post.Likes;
                likeArray.pop();
                return {...post, Likes: likeArray};
              }
            } else {
              return post;
            }
          })
        );

        if(likedPosts.includes(postId)) {
          setLikedPosts(likedPosts.filter((id) => {
            return id != postId;
          }))
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  }

  return (
    <div>
      {ListOfPosts.map((value, key) => {
        return (
          <div key={key} className='post'> 
            <div className='title'>{value.title} </div>
            <div 
              className='body'
              onClick={() => {navigate(`/post/${value.id}`)}}
            >
              {value.postText}
            </div>
            <div className='footer'>
              <div className="username">{value.username}</div>
              <div className="buttons">
                <img 
                  className="likeBttn"
                  src={likedPosts.includes(value.id) ? '../images/unlike.png' : '../images/like.png'}
                  onClick={() => { likeAPost(value.id) }}
                />

                <label>{value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )

}

export default Home;
