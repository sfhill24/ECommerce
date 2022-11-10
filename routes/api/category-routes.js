const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
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
