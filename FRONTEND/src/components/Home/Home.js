
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
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
             when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five
             centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p className='aboutus-content'>
              <h3>What We Do?</h3>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
             when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five
             centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p className='aboutus-content'>
              <h3>Our Services</h3>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
             when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five
             centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

      </div>
    </>
  );
}
export default Home;