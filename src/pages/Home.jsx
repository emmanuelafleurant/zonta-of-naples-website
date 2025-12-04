import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Home - Zonta Club of Naples";
  }, []);

  return (
    <div>
      <section className="home-hero">
        <div className="container" style={{ backgroundImage:'url(https://zonta-naples.org/wp-content/uploads/2019/11/IMG_1767-980x567.jpeg)', width: '100%', height: '400px', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
          <h1>Welcome to Zonta Club of Naples</h1>
          <p>
            Empowering women and promoting gender equality in Naples and beyond.
          </p>
        </div>
      </section>
      <section className="home-content">
        <div className="container">
          <h2>Greeting from Zonta Club of Naples</h2>
          <p>
            Zonta Club of Naples is part of tens of thousands of professionals worldwide
            who demand gender equality and the end of violence against women and girls.
            We seek to eradicate human trafficking, domestic violence, and child marriage
            so no woman lives in fear. Zonta provides grants, resources, scholarships and 
            services while advocating change, educating the community and helping direct responders 
            and law enforcement.
            
            We say NO to violence and YES to equal opportunity and rights for women and girls of Collier County.
            </p>
        </div>
      </section>
      <section className="events">
        <div className="container-events">
          <h2>Upcoming Events</h2>
          <script src="https://elfsightcdn.com/platform.js" async></script>
          <div className="elfsight-app-f70b9506-07b8-4da2-82f6-1c8fea0a1e1c" data-elfsight-app-lazy></div>
        </div>
      </section>

      <section className="home-join">
        <div className="container">
          <h2>Join Us</h2>
          <p>
            Become a member of Zonta Club of Naples and make a difference in the lives of women and girls in our community.
          </p>
          <button className="join-button" onClick={() => window.location.href = '/membership'} style={{ cursor: 'pointer' }}>
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
}    