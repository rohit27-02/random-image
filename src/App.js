/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import axios from 'axios';
import './App.css'

const RandomImage = ({ imageUrl, link }) => {
  return (
    <div className="random-image-container">
      <h1>Share with friends 💗</h1>
      <img src={imageUrl} alt="Random" className="random-image" />
      <div className="share-buttons">
        <FacebookShareButton url={link}>
          <FacebookIcon round={true} size={40} />
        </FacebookShareButton>
        <TwitterShareButton url={link}>
          <TwitterIcon round={true} size={40} />
        </TwitterShareButton>
        <WhatsappShareButton url={link}>
          <WhatsappIcon round={true} size={40} />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [link, setlink] = useState('');
  const api = process.env.REACT_APP_UNSPLASH_API_KEY;

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: {
            client_id: "88c4-bwJ2emG2vpVdmpGFBCxuQSjEslbsTadSBoOE5s",
            orientation: "squarish",
          },
        });
        console.log(response)
        const imageUrl = response.data.urls.regular;
        setImageUrl(imageUrl);
        setlink(response.data.links.html)


      } catch (error) {
        console.error('Error fetching random image:', error);
      }
    };

    fetchRandomImage();
  }, [api]);

  return (
    <div className="app">
      {imageUrl && <RandomImage link={link} imageUrl={imageUrl} />}
    </div>
  );
};

export default App;
