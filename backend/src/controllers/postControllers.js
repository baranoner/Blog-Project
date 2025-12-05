import {db} from "../db/db.js";

export async function getAllPosts(_, res) {
  try {
    const result = await db.query("SELECT * FROM posts ORDER BY posts.created_at DESC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error in getAllPosts controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getPostById(req, res) {
  try {
    const result = await db.query("SELECT * FROM posts WHERE id = $1", [req.params.id])
    if (result.rows.length === 0) return res.status(404).json({ message: "Post not found!" });
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error in getPostById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getCategoryPosts(req, res) {
  try {
    const {category} = req.params;
    const result = await db.query("SELECT * FROM posts WHERE posts.category = $1 ORDER BY posts.created_at DESC", [category]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error in getCategoryPosts controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createPost(req, res) {
  try {
    const user_id = req.user.id; 

    const { header, img_source, content, category } = req.body;
    
    const result = await db.query(
      "INSERT INTO posts (user_id, header, img_source, content, category) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
      [user_id, header, img_source, content, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error in createPost controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const { header, img_source, content, category } = req.body;

    const result = await db.query(
      "UPDATE posts SET header = $1, img_source = $2, content = $3, category = $4 WHERE id = $5 RETURNING *",
      [header, img_source, content, category, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Post not found" });

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error in updatePost controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function deletePost(req, res) {
  try {
    const {id} = req.params;
    const result = await db.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully!" });
  } catch (error) {
    console.error("Error in deletePost controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}