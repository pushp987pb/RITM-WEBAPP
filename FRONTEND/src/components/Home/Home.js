
import React from 'react';
import './Home.css';

function Home() {
  return (
    <>
      <div className="hero-section">
        {/* Replace the dummy image URL with your actual image URL */}
        <img
          className="hero-image"
          src="https://pragyata.com/wp-content/uploads/2020/08/hindu-temple.jpg" alt="Hero Section"
        />
        <div className="hero-content">
          <h1 className="hero-heading">Welcome to Our Temple Management System</h1>
          {/* Add more content for the hero section if needed */}
        </div>
      </div>

      <div className='container1'>
        <h2 className='text-center display-6 lead'>About Us</h2>
        <hr></hr>
        {/* Add more content for the main section of the page */}
        <p className='aboutus-content'>
          <h3>What We Are?</h3>
          Our temple management system is more than just software; it’s a bridge connecting devotees, temple 
          authorities, and the divine. We are the digital caretakers of sacred spaces, ensuring that the spiritual journey remains seamless and enriching. Our mission is to empower temples by providing them with robust tools for administration, communication, and community engagement.
           Whether it’s a centuries-old shrine or a newly constructed temple, we stand as custodians of tradition,
            technology, and trust.
            </p>
              <p className='aboutus-content'>
              <h3>What We Do?</h3>
              At the heart of our system lies simplicity and efficiency. We facilitate temple registration, allowing authorities to create accounts effortlessly. Once onboarded, temples can share vital information—location, facilities,
               and services—with their devotees. Our platform streamlines donation collection, making it convenient for the devotees
               and other contributors to support these spiritual centers. Devotees, too, benefit from our services. They can create personalized dashboards, track their temple visits, and record their offerings. Our commitment extends beyond mere functionality; 
               we’re weaving a digital tapestry that unites faith, culture, and community.</p>
             <p className='aboutus-content'>
              <h3>Our Services</h3>
              We guide temple authorities through the registration process, ensuring accurate representation. 
              Profiles showcase essential details, such as opening hours, festivals, and historical significance.
              Our platform enables secure and transparent donation collection. NCC members and devotees can contribute seamlessly, 
              knowing their offerings directly benefit the temple and its activities. Devotees gain access to their personalized dashboard. 
              Here, they can maintain records of their temple visits, note their intentions (Tennyson’s), and stay informed about upcoming events.
              We foster connections within the temple community. Whether it’s sharing spiritual insights, organizing events, or celebrating festivals, our platform encourages active participation.
            </p>

      </div>
    </>
  );
}
export default Home;