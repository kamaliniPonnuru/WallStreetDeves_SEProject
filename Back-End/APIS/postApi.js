//create router to handle user api reqs
const exp = require("express");
const postApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const { ObjectId } = require('mongodb');
require("dotenv").config();
const verifyToken = require('./middlewares/verifyToken')
postApp.use(exp.json());
postApp.use(exp.urlencoded());


postApp.post(
    "/new-post",
    expressAsyncHandler(async (request, response) => {
        //get postCollectionObject
        let postCollectionObject = request.app.get("postCollectionObject");
        
        //get newPostObj as string from client and convert into object
        let newPostObj;
        console.log("Received postObj data:", request.body.postObj);
        try {
            // Try to parse the JSON string
            newPostObj = JSON.parse(request.body.postObj);
        } catch (error) {
            // If parsing fails, handle the error (e.g., log it)
            console.error("Error parsing JSON:", error);
            response.status(400).send({ message: "Invalid JSON data" });
            return;
        }

        // Insert the new post object into the database
        await postCollectionObject.insertOne(newPostObj);
        response.send({ message: "New Post created" });
    })
);

postApp.post(
  "/reportpost/:postId",
  expressAsyncHandler(async (request, response) => {
    // Get postCollectionObject
    let postCollectionObject = request.app.get("postCollectionObject");
    let reportPostCollectionObject = request.app.get("reportPostCollectionObject");
    
    const postId = request.params.postId;

    try {
      // Check if the post with the given postId exists
      const post = await postCollectionObject.findOne({ _id: new ObjectId(postId) });
      console.log(post)
      if (!post) {
        response.status(404).send({ message: "Post not found" });
        return;
      }

      // Check if the post already exists in reportPostCollectionObject
      const existingReport = await reportPostCollectionObject.findOne({ "post._id": post._id });
      if (existingReport) {
        // If the post exists, increase the count
        await reportPostCollectionObject.updateOne({ "post._id": post._id }, { $inc: { count: 1 } });
      } else {
        // If the post does not exist, insert it with count 1
        await reportPostCollectionObject.insertOne({ post, count: 1 });
      }
      
      response.send({ message: "Post reported successfully" });
    } catch (error) {
      console.error("Error reporting post:", error);
      response.status(500).send({ message: "Internal server error" });
    }
  })
);
postApp.put(
  "/edit-post/:postId",
  expressAsyncHandler(async (request, response) => {
    try {
      const postId = request.params.postId;
      const { title, content, category } = request.body; // Assuming these are the fields you want to update

      // Get postCollectionObject
      let postCollectionObject = request.app.get("postCollectionObject");

      // Check if the post with the given postId exists
      const post = await postCollectionObject.findOne({ _id: new ObjectId(postId) });
      if (!post) {
        return response.status(404).send({ message: "Post not found" });
      }

      // Update the post with the new values
      await postCollectionObject.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { title, content, category } }
      );

      response.send({ message: "Post updated successfully" });
    } catch (error) {
      console.error("Error updating post:", error);
      response.status(500).send({ message: "Internal server error" });
    }
  })
);


const ITEMS_PER_PAGE = 10;

postApp.get(
    "/posts",
    expressAsyncHandler(async (request, response) => {
        let postCollectionObject = request.app.get("postCollectionObject");

        // Parse query parameters
        const page = parseInt(request.query.page) || 1; // Current page, default to 1
        const visibility = request.query.visibility || 'public'; // Post visibility, default to public
        const currentUser = request.query.currentUser; // Get currentUser parameter

        // Calculate skip value for pagination
        const skip = (page - 1) * ITEMS_PER_PAGE;

        // Construct the query object based on visibility and currentUser parameters
        let query = { visibility };
        if (currentUser) {
            // Fetch posts excluding the ones created by the current user
            query.createdBy = { $ne: currentUser };
        }

        let totalPosts = await postCollectionObject.countDocuments(query);
        let totalPages = Math.ceil(totalPosts / ITEMS_PER_PAGE);

        // Fetch posts for the current page
        let posts = await postCollectionObject.find(query)
            .sort({ createdAt: -1 }) // Sort by creation date, latest first
            .skip(skip) // Skip posts for pagination
            .limit(ITEMS_PER_PAGE) // Limit number of posts per page
            .toArray();

        response.send({ message: "Posts list", payload: { posts, totalPages } });
    })
);



postApp.delete(
    "/delete-post/:postId",
    expressAsyncHandler(async (request, response) => {
      // Get postCollectionObject
      let postCollectionObject = request.app.get("postCollectionObject");
      
      const postId = request.params.postId;
  
      try {
        // Check if the post with the given postId exists
        const post = await postCollectionObject.findOne({ _id: new ObjectId(postId) });
        console.log(post)
        if (!post) {
          response.status(404).send({ message: "Post not found" });
          return;
        }
  
        // Delete the post
        await postCollectionObject.deleteOne({ _id: new ObjectId(postId) });
        
        response.send({ message: "Post deleted successfully" });
      } catch (error) {
        console.error("Error deleting post:", error);
        response.status(500).send({ message: "Internal server error" });
      }
    })
  );
  


//private route for testing
postApp.get('/test', verifyToken, (request, response) => {
  response.send({ message: "This reply is from private route" })
})

//create a route to modify user data

//create a route to delete user by username

//export userApp
module.exports = postApp;