import axios from 'axios'
import { useEffect, useState } from 'react'
import Create from './Create'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

const [unsplashimages, setUnsplashimages] = useState([])
  useEffect(() => {
    const getApi = () => {
      axios.post('https://adnanjwt.azurewebsites.net/api/authenticate/login',{
        "username" : "yourname@yahoo.com",
   "password":"yourpwd"
    })
    .then( (response) => {
        
        let token = response.data.token;
        console.log(token);
        
        localStorage.setItem("token", 'Bearer ' + token);
        
        axios.get('https://adnanjwt.azurewebsites.net/api/unsplashimages', {
          headers: {
            
            Authorization: localStorage.getItem("token")
			
            
          }
        })
        .then(res => {
          console.log('res data :', res.data)
          setUnsplashimages(res.data)
         
        })
        .catch(err => { console.log(err) })
    })
      
      
    }
    getApi()
    
  }, [])

  return (
    <div>
      {unsplashimages ? (
        <><h4>working...</h4>
          {unsplashimages.map((unsplashimage) => {
            return <h4 key={unsplashimage.unsplashImageId} ><img src={unsplashimage.unsplashImageUrl} className="img-fluid" /></h4>
          })}
        </>
      ) : (
        <div><h4>This part of ternary is to show when unsuccessful </h4></div>
      )
      }


     <Create/>



    </div>
  )
}

export default App
