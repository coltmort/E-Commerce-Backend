const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try{
    let tags = await Tag.findAll({include:{all:true}})
    res.json(tags)
  } catch (err){
    res.json(err)
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try{
    let tag = await Tag.findOne({where: {id: req.params.id}},{include:{all:true}})
    res.json(tag)
  } catch (err){
    res.json(err)
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    let newTag = await Tag.create(req.body)

    res.json(newTag)
  } catch (err){
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value

  try{
    let updatedTag = await Tag.update(req.body, {where: {id: req.params.id}})
    res.send(updatedTag)
  } catch(err){
    res.status(400).json('ID not found')
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    let destroyedTag = await Tag.destroy({where: {id:req.params.id}})
    res.json(destroyedTag)
  } catch(err){
    res.status(400).json('ID not found')
  }
});

module.exports = router;
