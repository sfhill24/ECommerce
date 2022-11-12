const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    let allTags = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"]
        },
      ]
    })
    res.json(allTags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    let oneTag = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"]
        },
      ]
    })
    res.json(oneTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/create', async (req, res) => {
  // create a new tag
  try {
    let newTag = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.json(newTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    let updateTag = await Tag.update({ tag_name: req.body.tag_name }, {
      where: {
        id: req.params.id
      },
      include: [
        {
          model: ProductTag,
          attributes: ["id", "product_id", "tag_id"]
        }
      ]
    })
    res.status(204).json();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    let deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(deletedTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
