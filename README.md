# Personal Portfolio & Blog Website (Backend)

## Objective

The backend for the Personal Portfolio & Blog Website built with Node.js, Express.js, and MongoDB. This backend handles authentication, blog management, and message storage for the contact form.

## Features

### API Endpoints

2. **Blog Management**

   - **GET /api/blogs**

     - Retrieves a list of all blogs.

   - **GET /api/blogs/:id**

     - Retrieves a single blog by its ID.

   - **POST /api/blogs**

     - Creates a new blog post.
     - Requires fields: `title`, `content`, `image`, `category`.

   - **PUT /api/blogs/:id**

     - Updates a blog post by its ID.
     - Requires fields: `title`, `content`, `image`, `category`.

   - **DELETE /api/blogs/:id**
     - Deletes a blog post by its ID.

3. **Contact Form Message Storage**
   - **POST /api/message**
     - Receives messages from the contact form (name, email, message).
     - Stores messages in the database.

### Technologies Used

- **Node.js** - JavaScript runtime for the backend.
- **Express.js** - Web framework for building RESTful APIs.
- **MongoDB** - NoSQL database for storing blogs and contact form messages.
- **NextAuth** - For handling authentication and social login.

## Installation:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the server using `npm run dev`.
