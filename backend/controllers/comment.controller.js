import Comments from "../models/comment.schema.js";

export const createComment = async (req, res) => {
  const trekkingRoutesId = req.params.id;
  const commentInfo = req.body;
  try {
    const newComment = new Comments({
      ...commentInfo,
      trekkingRoutes: trekkingRoutesId,
    });
    const createdComment = await newComment.save();
    return res.send({ data: createdComment });
  } catch (err) {
    res.status(400).send({ error: "something went wrong" });
  }
};

export const readAllComments = async (req, res) => {
  try {
    const allComments = await Comments.find({
      trekkingRoutes: req.params.id,
    })
      .populate("trekkingRoutes", ["title"])
      .populate("user", ["name", "email", "avatar"]);
    
    return res.send({ data: allComments });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "something went wrong" });
  }
};

export const readOneComment = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  try {
    const comment = await Comments.findById(id).populate("trekkingRoutes", [
      "title",
    ]);
    return res.send({ data: comment });
  } catch (err) {
    res.status(400).send({ error: "something went wrong" });
  }
};

export const editComment = async (req, res) => {
  const id = req.params.id;
  const dataToModify = req.body;
  try {
    const editedComment = await Comments.findByIdAndUpdate(id, dataToModify, {
      new: true,
    });
    return res.send({ data: editedComment });
  } catch (err) {
    res.status(400).send({ error: "something went wrong" });
  }
};

export const deleteComment = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedComment = await Comments.findOneAndDelete(id);
    return res.send({ data: deletedComment });
  } catch (err) {
    res.status(400).send({ error: "something went wrong" });
  }
};
