const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  let categories = await Category.findAll({include:{all:true}})
  // be sure to include its associated Products
  res.json(categories)
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  let category = await Category.findOne({where: {id: req.params.id}},{include:{all:true}})
  // be sure to include its associated Products
  res.json(category)
});

router.post('/', async (req, res) => {
  // create a new category
  console.log(req.body)
  try {
  let newCategory = await Category.create(req.body)

  // let response = await Category.findOne({where: {category_name: req.body.category_name}})

  res.json(newCategory)
  } catch (err){
    res.status(400).json('ID not found')
    }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
  let updatedCategory = await Category.update(req.body, {where: {id: req.params.id}})

  res.send(updatedCategory)
  } catch (err){
    res.status(400).json('ID not found')
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
  let destoryedCategory = await Category.destroy({where: {id: req.params.id}})
  res.json(destoryedCategory)
  } catch (err){res.status(400).send('ID not found')}
});

module.exports = router;
