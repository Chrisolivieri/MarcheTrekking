import TrekkingRoutes from "../models/trekkigRoutes.schema.js";

export const getTrekkingRoutes = async (req, res) => {
  const routes = await TrekkingRoutes.find({}).sort({ name: 1 });
  res.send(routes);
};

export const getTrekkingRoute = async (req, res) => {
  const id = req.params.id;

  try {
    const findTrekkingRoute = await TrekkingRoutes.findById(id);
    res.send(findTrekkingRoute);
  } catch (err) {
    res.status(404).send({ error: "Trekking route not found" });
  }
};

export const createTrekkingRoute = async (req, res) => {
  const trekkingData = req.body;
  if (req.file.path) {
    trekkingData.image = req.file.path;
  }
  const newTrekkingRoute = new TrekkingRoutes(trekkingData);
  try {
    const savedTrekkingRoute = await newTrekkingRoute.save();
    return res.status(201).send(savedTrekkingRoute);
  } catch (err) {
    res.status(400).send({ error: "Trekking route not created" });
  }
};

export const updateTrekkingRoute = async (req, res) => {
  const id = req.params.id;
  const updateTrekkingRoute = req.body;

  try {
    await TrekkingRoutes.findByIdAndUpdate(id, updateTrekkingRoute);
    const updatedTrekkingRoute = await TrekkingRoutes.findById(id);
    return res.send(updatedTrekkingRoute);
  } catch (err) {
    res.status(400).send({ error: "Trekking route not updated" });
  }
};

export const deleteTrekkingRoute = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTrekkingRoute = await TrekkingRoutes.findByIdAndDelete(id);

    if (!deletedTrekkingRoute) {
      return res.status(404).send({ error: "Trekking route not found" });
    }

    return res.send(deletedTrekkingRoute);
  } catch (err) {
    res.status(400).send({ error: "Trekking route not deleted" });
  }
};

export const updateImage = async (req, res) => {
  const id = req.params.id;
  const imageToUpdate = { image: req.file.path };

  try {
    await TrekkingRoutes.findByIdAndUpdate(id, imageToUpdate, { new: true });
    const updatedTrekkingRoute = await TrekkingRoutes.findById(id);
    return res.send(updatedTrekkingRoute);
  } catch (err) {
    res.status(400).send({ error: "Trekking route not updated" });
  }
};
