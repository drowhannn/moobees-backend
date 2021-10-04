import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  bannerUrl: {
    type: String,
    required: true,
  },
  trailerUrl: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  ageRating: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  runTime: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  director: {
    type: [String],
    required: true,
  },
  casts: {
    type: [String],
    required: true,
  },
  keywords: {
    type: [String],
    required: true,
  },
  revenue: {
    type: Number,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  originalLanguage: {
    type: String,
    required: true,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("movie", movieSchema);
