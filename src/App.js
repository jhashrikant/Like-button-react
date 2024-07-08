import { useState } from 'react';
import './App.css';
import { Heart ,Loader } from 'lucide-react';

function App() {

  const [liked, setLiked] = useState(false)
  const [Loading, setLoading] = useState(false)
  const [error, seterror] = useState("")


  const handleLikeUnlike = async () => {
    setLoading(true)
    seterror('')
    try {
      const response = await fetch("https://www.greatfrontend.com/api/questions/like-button", {
        method: "POST",
        body: JSON.stringify({ action: liked ? "unlike" : "like" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log('ok', json);
      if (json.message === 'Success!') {
        setLiked(!liked)
        setLoading(false)
      }
      else {
        setLoading(false)
        seterror(json.message)
        return
      }
    } catch (error) {
      console.error(error.message);
      setLoading(false)
      seterror(error.message)
    }
  }

  return (
    <div className='main'>
      <button className='likeBtn' onClick={handleLikeUnlike} style={{ backgroundColor: liked ? 'red' : '' }}>
        {Loading ? <Loader /> : <Heart className='heartIcon' />}
        {liked ? 'Liked' : 'Like'}
      </button>
      {error && <div className='error'>{error}</div>}
    </div>
  );
}

export default App;
