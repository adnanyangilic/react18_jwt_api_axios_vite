import React, { useState } from 'react';

function Create() {
  const [recdata, setRecdata] = useState({});
  const myComponentStyle = {
    background: 'blue',
    border:'5px solid brown',
    padding: '1.5em',
 }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://adnanjwt.azurewebsites.net/api/unsplashimages', {
      method: 'POST',
      body: JSON.stringify(recdata),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem("token")
      }
    });
    const result = await response.json();
    console.log(result);
  }

  return (
    <center>
      <br/>
      <div style={myComponentStyle}>
    <form onSubmit={handleSubmit}>
      <div className="form-group" ><input type="text" placeholder="Write image url here" onChange={e => setRecdata({...recdata, unsplashImageUrl: e.target.value})} /></div>
      <div className="form-group" ><input type="text" placeholder="Write image description here" onChange={e => setRecdata({...recdata, unsplashImageDescription: e.target.value})} /></div>
      
      <div className="form-group" ><button type="submit">Submit</button></div>
    </form>
    </div>
    </center>
  );
}

export default Create;
