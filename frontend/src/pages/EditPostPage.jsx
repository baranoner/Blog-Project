import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Container, Form, Button, Row, Col, Spinner, Image } from "react-bootstrap";
import { toast } from "react-hot-toast";
import api from "../libs/axios";

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    header: "",
    content: "",
    category: "",
    img_source: "",
  });

  const [newImgFile, setNewImgFile] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const BASE_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get("/posts/" + id);
        setFormData({
          header: res.data.header,
          content: res.data.content,
          category: res.data.category,
          img_source: res.data.img_source,
        });
      } catch (error) {
        console.error("Error fetching post:", error);
        toast.error("Failed to load post");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImgFile(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let finalImgSource = formData.img_source;

      if (newImgFile) {
        const imageFormData = new FormData();
        imageFormData.append("image", newImgFile);

        const uploadRes = await api.post("/upload", imageFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        finalImgSource = uploadRes.data.filename;
      }

      await api.put(`/posts/${id}`, {
        header: formData.header,
        content: formData.content,
        category: formData.category,
        img_source: finalImgSource,
      });

      toast.success("Post updated successfully!");
      navigate(`/post/${id}`); 
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="light" />
      </div>
    );

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="text-center text-white mb-4" style={{ fontFamily: "'Crimson Text', serif", fontSize: "40px" }}>
            Edit Post
          </h2>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="postText">Post Title</Form.Label>
              <Form.Control
                name="header"
                value={formData.header}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="postText">Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category...</option>
                <option value="Everyday Life">Everyday Life</option>
                <option value="Philosophy">Philosophy</option>
                <option value="Movies-TV Shows">Movies-TV Shows</option>
                <option value="Video Games">Video Games</option>
                <option value="Books-Comics">Books-Comics</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="postText">Post Image (Optional)</Form.Label>
              <div className="mb-2 text-center">
                {previewImg ? (
                  <Image
                    src={previewImg}
                    thumbnail
                    style={{ maxHeight: "200px" }}
                  />
                ) : formData.img_source ? (
                  <Image
                    src={`${BASE_URL}/images/${formData.img_source}`}
                    thumbnail
                    style={{ maxHeight: "200px" }}
                  />
                ) : (
                  <div className="text-white-50">No image uploaded</div>
                )}
              </div>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="postText">Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
              />
              <Form.Text className="text-white-50" style={{fontFamily: "Inter"}}>
                You can use HTML tags.
              </Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">
              <Button 
                variant="secondary" 
                onClick={() => navigate(-1)}
                style={{ fontFamily: "Inter" }}
              >
                Cancel
              </Button>
              <Button 
                variant="warning" 
                type="submit" 
                disabled={submitting}
                style={{ fontFamily: "Inter" }}
              >
                {submitting ? "Updating..." : "Update Post"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditPostPage;
