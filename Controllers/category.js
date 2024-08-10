const category = require("../models/category");
const CAT = require("../models/category");

exports.createCategory = async (req, res, next) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title || !imageUrl) {
      return res.status(404).send({
        success: false,
        message: "Please Provide the category title or image",
      });
    }
    const newCAT = new CAT({ title, imageUrl });
    newCAT.save();
    return res.status(201).send({
      success: true,
      message: "Category Created",
      newCAT,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error In Create CAT API",
    });
  }
};

exports.getAllCategory = async (req, res, next) => {
  try {
    const newCAt = await CAT.find();
    if (!newCAt) {
      return res.status(404).send({
        success: false,
        message: "No Category Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Category Data Fetched Successfully",
      newCAt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error In Fetching Category",
      err,
    });
  }
};

exports.getCatById = async (req, res, next) => {
  const CATid = req.params.id;
  try {
    const category = await CAT.findById(CATid);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category Not Found!",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Category Fetched Successfully",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error In Fetching Category!",
      err,
    });
  }
};


exports.CatUpdate = async (req, res, next) => {
    const CatId = req.params.id;
    const {title, imageUrl} = req.body;
    try {
        const updatecategory = await CAT.findByIdAndUpdate(CatId, {title: title, imageUrl: imageUrl}, { new: true, runValidators: true});
        if(!updatecategory) {
            res.status(404).send({
                success: false,
                message: 'Category Not Found'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Category Updated Successfully',
            category: updatecategory
        })

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Updating the Category',
            err
        })
    }
}

exports.deleteById = async (req, res, next) => {
    const CatId = req.params.id;
    try {
        const category = await CAT.findByIdAndDelete(CatId);
        if(!category) {
            return res.status(404).send({
                success: false,
                message: 'Category Not Found',
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Category Successfully Deleted',
            category
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Deleteing Category',
            err
        })
    }
}