const User = require("../models/user");
const ScanHistory = require(".././models/scanHistory");
const axios = require("axios");

exports.scanImage = async (req, res) => {
  try {
    console.log("came here --1");
    const { userId } = req.body;
    const image = req.file;

    console.log("came here --1.2");
    if (!image) {
      return res.status(400).json({ message: "No image uploaded!" });
    }
    console.log("came here --1.3");
    const user = await User.findById(userId);
    console.log("came here --1.4");
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    console.log("came here --2");

    const imageBuffer = image.buffer;
    const endpoint = process.env.AZURE_CUSTOM_VISION_ENDPOINT;
    const projectId = process.env.AZURE_CUSTOM_VISION_PROJECT_ID;
    const iterationName = process.env.AZURE_CUSTOM_VISION_ITERATION;
    const predictionKey = process.env.AZURE_CUSTOM_VISION_KEY;

    console.log(predictionKey);

    const response = await axios.post(
      `${endpoint}/customvision/v3.0/Prediction/${projectId}/classify/iterations/${iterationName}/image`,
      imageBuffer,
      {
        headers: {
          "Content-Type": "application/octet-stream",
          "Prediction-Key": predictionKey,
        },
      },
    );

    console.log("came here --3");
    const predictions = response.data.predictions;

    if (!predictions || predictions.length === 0) {
      return res
        .status(500)
        .json({ message: "No predictions returned from model." });
    }

    console.log("came here --4");

    const topPrediction = predictions.reduce((max, current) =>
      current.probability > max.probability ? current : max,
    );

    const { tagName, probability } = topPrediction;
    const confidence = Math.round(probability * 100);
    let message = "";
    let resultType = "";
    console.log(tagName);
    switch (tagName.toLowerCase()) {
      case "not-eye":
        message = "Not an eye image — upload a clear eye photo.";
        resultType = "invalid";
        break;

      case "cataract":
        message = "Cataract detected.";
        resultType = "cataract";
        break;

      case "normal":
        message = "No cataract detected.";
        resultType = "normal";
        break;

      default:
        message =
          "Unable to determine result. Please try again with a clearer image.";
        resultType = "uncertain";
        break;
    }
    console.log("came here --5");

    res.status(200).json({
      message,
      percentage: confidence,
      tagName,
      resultType,
      date: new Date(),
    });
  } catch (error) {
    console.error("Azure Vision Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Internal server error! Try again later.",
    });
  }
};

exports.scanHistory = async (req, res) => {
  try {
    const { scanEyeResults, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    await ScanHistory.create({
      user: userId,
      message: scanEyeResults.message,
      percentage: scanEyeResults.percentage,
    });

    res.status(200).json({
      message: "Scan history fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error! Try again later.",
    });
  }
};

exports.getScanHistory = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "user not found!",
      });
    }

    const userHistory = await ScanHistory.find({ user: userId }).sort({
      date: -1,
    });

    res.status(200).json({
      message: "User scan history fetched successfully",
      data: userHistory,
    });
  } catch (error) {
    console.error("Error fetching scan history:", error);
    res.status(500).json({
      message: "Internal server error! Try again later.",
    });
  }
};
