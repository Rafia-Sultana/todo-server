const router = require('express').Router();
//import todo model
const todoItemsModel = require('../models/todoItems');
//lets create our first route.. we will add todo item to our database
router.post('/api/item', async (req, res) => {
    try {
        const newItem = new todoItemsModel({
            item: req.body.item
        })
        //save this item in database
        const saveItem = await newItem.save()
        res.status(200).json(saveItem);

    }
    catch (error) {
        res.json(error);
    }
})
//create second route..get data from databse
router.get('/api/items', async (req, res) => {
    try {
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json(allTodoItems)
    } catch (error) {
        res.json(error);
    }
})





//update item
router.put('/api/item/:id', async (req, res) => {
    try {
        //find the item by its id and update it
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, { $set: req.body })
        res.status(200).json('Item Updated')
    } catch (error) {
        res.json(error);
    }
})

//delete item from database
router.delete('/api/item/:id', async (req, res) => {
    try {
        //find the item by its id and delete it
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Item deleted')
    } catch (error) {
        res.json(error);
    }
})


//exports router
module.exports = router;