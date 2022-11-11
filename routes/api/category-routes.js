const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    let allCategeories = await Category.findAll({
      attributes: ["id", "category_name"],
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"]
        }
      ]
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    let oneCategory = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"]
        }
      ]
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/create', async (req, res) => {
  // create a new category
  try {
    let newCategory = await Category.create({
      category_name: req.body.category_name
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    let updateCategory = await Category.update({
      where: {
        id: req.params.id
      },
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    let deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!deleteCategory) {
      res.status(404).json({ message: "ID not found" });
      return;
    }
    res.json(deleteCategory);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;
