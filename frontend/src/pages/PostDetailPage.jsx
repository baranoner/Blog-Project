import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-hot-toast";
import api from "../libs/axios.js";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const BASE_URL = "http://localhost:3000";

  const token = localStorage.getItem("token");

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get("/posts/" + id);
        await timeout(250);
        setPost(res.data);
      } catch (error) {
        console.log("Error fetching posts");
        console.log(error.response);
        toast.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/posts/${id}`);
      toast.success("Post deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  const buttonStyle = { width: "70px" };

  return (
    <div>
      <div className="d-flex justify-content-center">
        {loading && (
          <Spinner animation="border" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {post && !loading && (
          <div className="d-flex justify-content-center">
            <Container>
              <Row>
                <Col>
                  <Row>
                    <h1 className="text-center">{post.header}</h1>
                  </Row>

                  {token && (
                    <Row className="d-lg-none my-3">
                      <Col>
                        <div className="d-flex justify-content-center gap-2">
                          {/* Attach handler to Mobile Edit Button */}
                          <Button
                            variant="warning"
                            style={buttonStyle}
                            onClick={handleEdit}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="danger"
                            style={buttonStyle}
                            onClick={handleDelete}
                          >
                            Delete
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  )}

                  <Row className="justify-content-center my-4">
                    <Col xs={12} md={10} lg={8}>
                      {!imgError && post.img_source && (
                        <img
                          src={
                            post.img_source
                              ? `${BASE_URL}/images/${post.img_source}`
                              : "/default-image.jpg"
                          }
                          alt={post.header || "Post Image"}
                          className="img-fluid w-100"
                          onError={() => {
                            setImgError(true);
                          }}
                          style={{ maxHeight: "500px", objectFit: "cover" }}
                        />
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <div
                      style={{ fontSize: "24px" }}
                      className="postText text-center mt-3"
                    >
                      {post.content}
                    </div>
                  </Row>
                </Col>

                {token && (
                  <Col lg={"auto"} className="d-none d-lg-block mt-1">
                    <div className="d-flex flex-column gap-2">
                      {/* Attach handler to Desktop Edit Button */}
                      <Button variant="warning" size="sm" onClick={handleEdit}>
                        Edit
                      </Button>

                      <Button variant="danger" size="sm" onClick={handleDelete}>
                        Delete
                      </Button>
                    </div>
                  </Col>
                )}
              </Row>
            </Container>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;
