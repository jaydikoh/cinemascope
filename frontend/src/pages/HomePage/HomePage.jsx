import * as movieService from '../../services/movieService';

export default function HomePage() {
  const fetchData = async () => {
    const data = await movieService.getNowPlaying();
    console.log(data)
  }
    return (
      <>
    <h1>Home Page</h1>
    <div>
      <button onClick={fetchData}>View Movies</button>
    </div>
    </>
  );
    
  }