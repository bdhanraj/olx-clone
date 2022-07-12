const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const PostItem = require('../modals/Postitem')
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the PostItems using: GET "/api/posts/fetchallpostitems". Login required
router.get('/fetchallpostitems', fetchuser, async (req, res) => {
    try {
        const postItems = await PostItem.find({ user: req.user.id });
        res.json(postItems)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new PostItem using: POST "/api/posts/addpostitem". Login required
router.post('/addpostitem', fetchuser, [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('category', 'Enter a valid category').isLength({ min: 3 }),
    body('price', 'Price cannot be blank').exists(),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
    body('image', 'Image cannot be blank').exists(),], async (req, res) => {
        try {
            const { name, category, price, description, image } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const postItem = new PostItem({
                name, category, price, description, image, user: req.user.id
            })
            const savedPostItem = await postItem.save()

            res.json(savedPostItem)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update an existing PostItem using: PUT "/api/posts/updatepostitem". Login required
router.put('/updatepostitem/:id', fetchuser, async (req, res) => {
    const { name, category, price, description, image } = req.body;
    try {
        // Create a newPostItem object
        const newPostItem = {};
        if (name) { newPostItem.name = name };
        if (category) { newPostItem.category = category };
        if (price) { newPostItem.price = price };
        if (description) { newPostItem.description = description };
        if (image) { newPostItem.image = image };

        // Find the postItem to be updated and update it
        let postItem = await PostItem.findById(req.params.id);
        if (!postItem) { return res.status(404).send("Not Found") }

        if (postItem.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        postItems = await PostItem.findByIdAndUpdate(req.params.id, { $set: newPostItem }, { new: true })
        res.json({ postItem });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing PostItem using: DELETE "/api/posts/deletepostitem". Login required
router.delete('/deletepostitem/:id', fetchuser, async (req, res) => {
    try {
        // Find the postItem to be delete and delete it
        let postItem = await PostItem.findById(req.params.id);
        if (!postItem) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this PostItem
        if (postItem.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        postItem = await PostItem.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Post has been deleted", postItem: postItem });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router