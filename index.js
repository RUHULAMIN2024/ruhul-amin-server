require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("ruhul-amin");
    const projects = db.collection("projects");
    const blogs = db.collection("blogs");
    const messages = db.collection("messages");

    // =================== Projects CRUD ===================

    // Create a project
    app.post("/api/projects", async (req, res) => {
      try {
        const project = req.body;
        const result = await projects.insertOne(project);
        res
          .status(201)
          .json({ success: true, message: "Project created!", data: result });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });

    // Get all projects
    app.get("/api/projects", async (req, res) => {
      try {
        const result = await projects.find().toArray();
        res.status(200).json({ success: true, data: result });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });

    app.get("/api/projects/:id", async (req, res) => {
      try {
        const { id } = req.params;

        const result = await projects.findOne({ _id: new ObjectId(id) });
        res.status(200).json({ success: true, data: result });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });

    // Update a project
    app.put("/api/projects/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { _id, ...updatedData } = req.body;
        const result = await projects.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedData }
        );

        if (result.modifiedCount === 0) {
          return res
            .status(404)
            .json({ success: false, message: "No changes made!" });
        }

        res.status(200).json({ success: true, message: "Project updated!" });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });

    // Delete a project
    app.delete("/api/projects/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await projects.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Project not found!" });
        }

        res.status(200).json({ success: true, message: "Project deleted!" });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });

    // =================== Blogs CRUD ===================

    // Create a blog
    app.post("/api/blogs", async (req, res) => {
      try {
        const blog = req.body;
        const result = await blogs.insertOne(blog);
        res
          .status(201)
          .json({ success: true, message: "Blog created!", data: result });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });

    // Get all blogs
    app.get("/api/blogs", async (req, res) => {
      try {
        const result = await blogs.find().toArray();
        res.status(200).json({ success: true, data: result });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });

    app.get("/api/blogs/:id", async (req, res) => {
      try {
        const { id } = req.params;

        const result = await blogs.findOne({ _id: new ObjectId(id) });
        res.status(200).json({ success: true, data: result });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });

    // Update a blog
    app.put("/api/blogs/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { _id, ...updatedData } = req.body;
        const result = await blogs.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedData }
        );

        if (result.modifiedCount === 0) {
          return res
            .status(404)
            .json({ success: false, message: "No changes made!" });
        }

        res.status(200).json({ success: true, message: "Blog updated!" });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });

    // Delete a blog
    app.delete("/api/blogs/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await blogs.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Blog not found!" });
        }

        res.status(200).json({ success: true, message: "Blog deleted!" });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });

    // =================== Messages CRUD ===================

    // Create a message
    app.post("/api/messages", async (req, res) => {
      try {
        const message = req.body;
        const result = await messages.insertOne(message);
        res
          .status(201)
          .json({ success: true, message: "Message sent!", data: result });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });

    // Get all messages
    app.get("/api/messages", async (req, res) => {
      try {
        const result = await messages.find().toArray();
        res.status(200).json({ success: true, data: result });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });

    // Update a message (if needed)
    app.put("/api/messages/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const updatedData = req.body;
        const result = await messages.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedData }
        );

        if (result.modifiedCount === 0) {
          return res
            .status(404)
            .json({ success: false, message: "No changes made!" });
        }

        res.status(200).json({ success: true, message: "Message updated!" });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });

    // Delete a message
    app.delete("/api/messages/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await messages.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Message not found!" });
        }

        res.status(200).json({ success: true, message: "Message deleted!" });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });

    // =================== Server Start ===================
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } finally {
  }
}

run().catch(console.dir);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Server is running smoothly", timestamp: new Date() });
});
