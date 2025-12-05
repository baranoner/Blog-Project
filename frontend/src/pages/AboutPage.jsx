import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const AboutPage = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center align-items-center">
        {/* Left Column: Image */}
        <Col md={5} className="mb-4 mb-md-0 text-center">
          <Image
            src="/pp.jpg"
            alt="About Me"
            roundedCircle
            fluid
            style={{ 
              width: "300px", 
              height: "300px", 
              objectFit: "cover",
              border: "4px solid #EFAE20" 
            }}
          />
        </Col>

        {/* Right Column: Text */}
        <Col md={7}>
          <h1 
            className="mb-4" 
            style={{ 
              fontFamily: "'Crimson Text', serif", 
              color: "#EFAE20", 
              fontSize: "48px"
            }}
          >
            About Meditations
          </h1>
          
          <div className="text-white" style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", lineHeight: "1.8" }}>
            <p>
              Welcome. This is a space dedicated to the thoughts that linger after the movie ends, the book closes, or the day winds down.
            </p>
            <p>
              "Meditations" isn't just about reviews; it's about the philosophy hidden in everyday life, video games, and pop culture. It is a collection of reflections on the things that shape our modern perspective.
            </p>
            <p>
              Whether you are here to agree, disagree, or just find a quiet corner of the internet to read, I'm glad you stopped by.
            </p>
            
            <p className="mt-4 fst-italic text-white-50">
              — Baran
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;