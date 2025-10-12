import React, { useEffect, useState } from 'react'
import axios from 'axios';  

const Jokespage = () => {

    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/jokes')
        .then(res=>{
            console.log("API Response:", res.data);
            setJokes(res.data.jokes || []);
        })
        .catch(err=>{
            console.error("Error fetching jokes:", err);
            setError("Failed to load jokes");
        });
    },[])
  return (
    <div>
      {jokes.map((joke, index) => (
        <div key={index} className="joke">
          <p>{joke.id}</p>
          <p>{joke.joke}</p>
        </div>
      ))}
    </div>
  )
}
export default Jokespage
