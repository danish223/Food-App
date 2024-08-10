const Orders = require("../models/order");

exports.addOrders = async (req, res, next) => {
  const { cart } = req.body;
  let total = 0;
  if (!cart) {
    return res.status(404).send({
      success: false,
      message: "Please Food Cart or payment method",
    });
  }
  try {
    cart.map((i) => {
      total += i.price;
    });
    const newOrder = new Orders({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();

    return res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
      newOrder,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error In Orders Api",
      err,
    });
  }
};

exports.orderStatus = async (req, res, next) => {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide valid Order Id",
      });
    }
  
    try {
      // Check if the order exists
      const existingOrder = await Orders.findById(orderId);
      if (!existingOrder) {
        return res.status(404).send({
          success: false,
          message: "Order not found",
        });
      }
  
      const { status } = req.body;
      const updatedOrder = await Orders.findByIdAndUpdate(
        orderId,
        { status },
        { new: true, runValidators: true }
      );
  
      res.status(200).send({
        success: true,
        message: "Order status Updated",
        order: updatedOrder,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        message: "Error In Order Status Api",
        err,
      });
    }
  };
  