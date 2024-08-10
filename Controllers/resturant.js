const resturantModel = require("../models/resturant");

exports.createResturant = async (req, res, next) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and address",
      });
    }
    const newResturant = await resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    newResturant.save();
    res.status(201).send({
      success: true,
      message: "New Resturant  created Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      messagee: "Error In Create Resturant API",
      err,
    });
  }
};
// Get all the Resturant Details
exports.resturantDetails = async (req, res, next) => {
  try {
    const Resturant = await resturantModel.find();
    if (!Resturant) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Available",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Resturant fetched Successfully",
      Resturant,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Fetching the Resturant Details",
      err,
    });
  }
};

exports.detailsById = async (req, res, next) => {
  const ResturantId = req.params.id;
  try {
    const Resturant = await resturantModel.findById(ResturantId);
    if (!Resturant) {
      return res.status(404).send({
        success: false,
        message: "Resturant Not Found!",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Resturant Fetched Successfully",
      Resturant,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Details",
      err,
    });
  }
};

exports.resturantDeleteById = async (req, res, next) => {
  const ResturantId = req.params.id;
  try {
    const Resturant = await resturantModel.findByIdAndDelete(ResturantId);
    if(!Resturant) {
      return res.status(404).send({
        success: false,
        message: 'Resturant Not Found'
      })
    }
    return res.status(200).send({
      success: true,
      message: 'Resturant Successfully Deleted!'
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error in Resturant Delete Api',
      err
    })
    
  }
}