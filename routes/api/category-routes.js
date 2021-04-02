const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// coonfriging the categores based off the prodcuts.
// creating, adding. updating, deleting catergories 

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
      attributes: ["id", "product_name", "price", "stock", "caterory_id"]
    });
    res.status(200).json(categoryData);
    console.log(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    });

    if (!categoryData) {
      res.status(404).json({ message: "No categorys found!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//creating new category
router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});
//updating category
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(categoryData);
  } catch (error) {
    res.status(400).json(error);
  }
});
// deleting data
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });  if (!categoryData) {
      res.status(404).json({ message: "No categorys found!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
