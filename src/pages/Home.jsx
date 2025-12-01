import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Home - Zonta Club of Naples";
  }, []);

  return (
    <div>
      {/* Section 1: Hero Image */}
      <div className="hero-section">
        <div className="container">
          <h1>Welcome to Zonta Club of Naples</h1>
        </div>
      </div>
      {/* Section 2: Content */}
      <section className="content-section">
        <div className="container">
          <h2>Greetings from Zonta Club of Naples</h2>
          <p>
            Zonta Club of Naples is part of tens of thousands of professionals
            worldwide who demand gender equality and the end of violence against
            women and girls...
          </p>
          <p>
            Zonta provides grants, resources, scholarships and services while
            advocating change, educating the community, and helping direct
            responders and law enforcement.
          </p>
          <p>
            We say NO to violence and YES to equal opportunity and rights for
            women and girls of Collier County.
          </p>
        </div>
      </section>
      <div className="divider"/>
      {/* Section 3: Mission Statement */}
      <section className="mission-section">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            Zonta Club of Naples is a leading global organization of professionals
            empowering women through service and advocacy.
          </p>
        </div>
      </section>
    </div>
  );
  }
