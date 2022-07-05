const asyncHandler = require("express-async-handler");
const Goals = require("../models/index.js");
const base = asyncHandler(async (req, res) => {
  const resGoals = await Goals.find();
  res.status(200).json(resGoals);
});

const setbase = asyncHandler(async (req, res) => {
  // console.log(req.body.text);
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please Add Field");
  }
  const goals = await Goals.create({
    text: req.body.text,
  });
  res.status(200).json(goals);
});

const putbase = asyncHandler(async (req, res) => {
  const goal = await Goals.findById(req.params.id);
  console.log(goal);
  if (!goal) {
    res.status(400);
    throw new Error("Id Not Found !!");
  }
  const result = {
    status: "OK",
    message: "Successfully Update ",
    id: req.params.id,
  };
  const update = await Goals.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(update);
});

const deletebase = asyncHandler(async (req, res) => {
  const goal = await Goals.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Id Not Found !!");
  }
  await goal.remove();
  const result = {
    status: "OK",
    message: "Successfully Delete",
    id: req.params.id,
  };
  res.status(200).json(result);
});
module.exports = { base, setbase, putbase, deletebase };
