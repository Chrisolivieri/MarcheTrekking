import Favorites from "../models/favorites.schema.js";

export const addFavorite = async (req, res) => {
  const { userId, trekkingRouteId } = req.body;

  try {
    const existingFavorite = await Favorites.findOne({
      user: userId,
      trekkingRoute: trekkingRouteId,
    });

    if (existingFavorite) {
      return res.status(400).send({
        error: "Favorite already exists"
      });
    }

    const favorite = new Favorites({
      user: userId,
      trekkingRoute: trekkingRouteId,
    });

    await favorite.save();
    res.status(201).send(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getFavorites = async (req, res) => {
  const userId = req.params.userId;

  try {
    const favorite = await Favorites.find({ user: userId }).populate(
      "trekkingRoute"
    );
    res.status(200).send(favorite);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteFavorite = async (req, res) => {
  const { userId } = req.params; // get userId from url params
  const { trekkingRouteId } = req.body; // get trekkingRouteId from body

  try {
    const result = await Favorites.findOneAndDelete({
      user: userId,
      trekkingRoute: trekkingRouteId,
    });
    if (result) {
      return res.status(200).send(result);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
