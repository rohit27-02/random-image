/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import axios from 'axios';
import './App.css'

const RandomImage = ({ imageUrl }) => {
  return (
    <div className="random-image-container">
      <h1>Share with friends 💗</h1>
      <img src={imageUrl} alt="Random" className="random-image" />
      <div className="share-buttons">
      <a href="http://www.twitter.com/share" target='_blank'> <TwitterIcon round={true} size={40} /></a>
        <FacebookShareButton url={imageUrl}>
          <FacebookIcon round={true} size={40} />
        </FacebookShareButton>
        <TwitterShareButton title='random image' url={imageUrl}>
          <TwitterIcon round={true} size={40} />
        </TwitterShareButton>
        <WhatsappShareButton url={imageUrl}>
          <WhatsappIcon round={true} size={40} />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const api = process.env.REACT_APP_UNSPLASH_API_KEY;

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: {
            client_id: api,
            orientation: "squarish",
          },
        });
        const imageUrl = response.data.urls.regular;
        setImageUrl(imageUrl);
        

      } catch (error) {
        console.error('Error fetching random image:', error);
      }
    };

    fetchRandomImage();
  }, []);

  return (
    <div className="app">
      {imageUrl && <RandomImage imageUrl={imageUrl} />}
    </div>
  );
};

export default App;
