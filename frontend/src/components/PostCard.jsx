import React from "react";
import Card from "react-bootstrap/Card";
import {Link} from "react-router"

const PostCard = ({post}) => {
  const BASE_URL = 'http://localhost:3000';
  return (
    <Card border="dark" style={{width: "100%", borderRadius: "7%" }}>
      <Card.Img
        style={{ height: "15rem", borderRadius: "7%", objectFit: "cover" }}
        variant="top"
        src={post.img_source ? `${BASE_URL}/images/${post.img_source}` : "/default-image.jpg"}
        onError={(e) => {
          console.log("Image failed to load:", post.img_source);
          e.target.src = "/default-image.jpg";
        }}
      />
      <Card.Body>
        <Card.Title className="fw-bold">{post.header}</Card.Title>
        <Card.Subtitle style={{fontSize: "90%"}} className="mb-2 text-muted">
          {post.category}
        </Card.Subtitle>
        <Card.Text>
          {post.content.slice(0, 150) + "..."}
        </Card.Text>
        <Link className="readAnchor" to={"/post/" + post.id}>
          Read →
        </Link>
      </Card.Body>
    </Card>
  );
};

export default PostCard;