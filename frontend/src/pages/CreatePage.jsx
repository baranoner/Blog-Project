import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Image} from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../libs/axios.js";

const CreatePage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    header: "",
    category: "",
    content: ""
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [previewImg, setPreviewImg] = useState(null); 
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImg(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let img_source = null;
      if (imageFile) {
         img_source = uploadRes.data.filename;
      }

      await api.post("/posts", { 
        header: formData.header,
        img_source: img_source,
        content: formData.content,
        category: formData.category
      });
      
      toast.success("Post created successfully!");
      navigate("/");
    } catch (error) {
    } finally {
      setLoading(false);
    }
};

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          
          <h2 className="text-center text-white mb-4" style={{ fontFamily: "'Crimson Text', serif", fontSize: "40px" }}>
            Create New Post
          </h2>

          <Form onSubmit={handleSubmit}>
            
            <Form.Group className="mb-3">
              <Form.Label className="postText">Post Title</Form.Label>
              <Form.Control 
                type="text"
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
            
            
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label className="postText">Post Image (Optional)</Form.Label>
              
              
              <div className="mb-2 text-center">
                {previewImg && (
                  <Image src={previewImg} thumbnail style={{ maxHeight: "200px" }} />
                )}
              </div>

              <Form.Control 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>
            
           
            <Form.Group className="mb-3">
              <Form.Label className="postText">Post Content</Form.Label>
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
                onClick={() => navigate("/")}
                style={{ fontFamily: "Inter" }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="warning" 
                style={{ fontFamily: "Inter" }}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePage;