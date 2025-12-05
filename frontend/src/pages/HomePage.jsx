import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Quote from "../components/Quote";
import PostCard from "../components/PostCard";
import api from "../libs/axios.js";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  
  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const endpoint = category ? `/posts/category/${category}` : "/posts";
        const res = await api.get(endpoint);
        await timeout(250);
        setPosts(res.data);
      } catch (error) {
        console.log("Error fetching posts");
        console.log(error.response);
        toast.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [category]);
  
  return (
    <div>
      {!category && <Quote />}
      <div className="d-flex justify-content-center mt-5">
        
        {/* 1. Loading State */}
        {loading && (
          <Spinner animation="border" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

        {/* 2. Content State (Posts exist) */}
        {posts.length > 0 && !loading && (
          <div className="d-flex justify-content-center">
            <Container>
              <Row>
                {posts.map((post) => (
                  <Col key={post.id} style={{minWidth: "20rem"}} lg="4" md="6" className="mb-5">
                    <PostCard post={post} setPosts={setPosts} />
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        )}

        {/* 3. Empty State (No posts found) */}
        {!loading && posts.length === 0 && (
          <div className="text-center mt-4">
            <div style={{ fontSize: "60px", marginBottom: "10px" }}>
              🍃
            </div>
            <h3 
              className="text-white" 
              style={{ fontFamily: "'Crimson Text', serif", fontSize: "28px" }}
            >
              It's a little quiet here...
            </h3>
            <p 
              className="text-white-50 mt-2" 
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              No posts found yet. Baran will share his amazing thoughts soon! ✨
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default HomePage;