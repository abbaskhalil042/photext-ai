import FormData from "form-data";
import User from "../models/user.model.js";
import axios from "axios";

import dotevn from "dotenv";
dotevn.config();

export const generateImage = async (req, res) => {
  const { userId, prompt } = req.body;

  try {
    // Validate input data
    if (!userId || !prompt) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if user has enough credits
    if (user.creditBalance <= 0) {
      return res.status(400).json({
        success: false,
        message: "Insufficient credits",
        creditBalance: user.creditBalance,
      });
    }

    // Prepare form data for Clipdrop API
    const formData = new FormData();
    formData.append("prompt", prompt);

    // Call Clipdrop API to generate the image
    const response = await generateImageFromAPI(formData);

    // Process the response and generate the base64 image
    const resultImage = await processImageResponse(response);

    // Deduct 1 credit from the user
    await User.findByIdAndUpdate(user._id, {
      $inc: { creditBalance: -1 },
    });

    // Send success response with the generated image
    return res.status(200).json({
      success: true,
      message: "Image generated successfully",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });
  } catch (error) {
    console.error("Error in generateImage:", error);

    // Log API error details if available
    if (error.response) {
      console.error("API Error Response:", error.response.data);
      console.error("API Error Status:", error.response.status);
      console.error("API Error Headers:", error.response.headers);
    }

    return res.status(500).json({ success: false, message: error.message });
  }
};

// Helper function to call the Clipdrop API
const generateImageFromAPI = async (formData) => {
  try {
    const response = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
      }
    );
    console.log("API Response Headers:", response.headers);
    console.log("API Response Length:", response.data.length);

    // Validate API response
    if (!response.data || response.data.length === 0) {
      throw new Error("Invalid or empty response from API.");
    }

    return response;
  } catch (error) {
    console.error("Error in API call:", error);
    throw new Error("Failed to generate image from API.");
  }
};

// Helper function to process the image response and convert to base64
const processImageResponse = async (response) => {
  try {
    const base64Image = Buffer.from(response.data).toString("base64");
    console.log("Base64 Image Length:", base64Image.length);

    const contentType = response.headers["content-type"] || "image/png";
    const resultImage = `data:${contentType};base64,${base64Image}`;

    console.log("Result Image URL:", resultImage);
    return resultImage;
  } catch (error) {
    console.error("Error processing image response:", error);
    throw new Error("Failed to process image data.");
  }
};
