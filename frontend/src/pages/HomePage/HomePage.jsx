import * as movieService from '../../services/movieService';
import '../HomePage/HomePage.css'
import { NavLink } from 'react-router'; 
// import '../../components/NavBar/NavBar'

export default function HomePage({user}) {
  const fetchData = async () => {
    const data = await movieService.getNowPlaying();
    console.log(data);
  };

  return (
    <>
      
      <header className="hero-section">
        <div className="hero-content">
          <h1>Discover the Latest in Cinema</h1>
          <p>
            Uncover the excitement of the newest films with CinemaScope! Browse
            our complete listings to see what’s “Now Showing” and never miss an
            opportunity to enjoy a cinematic masterpiece.
          </p>

          <NavLink to={!user ? "/login" : "/now-playing"}>
          <button className="hero-btn">Explore Now Showing</button>
          </NavLink> 
        </div>
      </header>

      
      <section className="features-section">
        <div className="feature">
          <img src="path-to-image" alt="Now Showing" />
          <h3>Now Showing: Latest Releases</h3>
          <p>
            Explore what’s currently in theaters with engaging visuals and
            detailed descriptions.
          </p>
        </div>
        <div className="feature">
          <img src="path-to-image" alt="Diverse Films" />
          <h3>Diverse Film Selections</h3>
          <p>
            Browse a curated collection across various genres, ensuring there’s
            something for everyone to enjoy.
          </p>
        </div>
        <div className="feature">
          <img src="path-to-image" alt="Plan Your Movie Night" />
          <h3>Plan Your Movie Night</h3>
          <p>
            Get essential details like showtimes and theater locations, making
            your outing hassle-free.
          </p>
        </div>
      </section>

      
      <section className="testimonials-section">
        <h2>Our Happy Clients</h2>
        <div className="testimonial">
          <blockquote>
            CinemaScope has transformed my movie nights! The recommendations
            are spot-on.
          </blockquote>
          <cite>- Emily Carter</cite>
        </div>
        <div className="testimonial">
          <blockquote>
            With CinemaScope, I can finally find the best film for my mood!
          </blockquote>
          <cite>- David Lee</cite>
        </div>
      </section>

      
      {/* <section className="contact-section">
        <h2>Connect With Us</h2>
        <form>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit">Send Your Inquiry</button>
        </form>
      </section> */}
    </>
  );
}

