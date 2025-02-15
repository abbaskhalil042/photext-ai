import FormData from "form-data";
import User from "../models/user.model.js";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;
    console.log(userId);
    const user = await User.findById(userId);
    console.log(user);

    //& checked if user exists
    if (!user || !prompt) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }
    //& checked if user has enough credits

    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.status(400).json({
        success: false,
        message: "Insufficient credits",
        creditBalance: user.creditBalance,
      });
    }
    //& user has enough credits
    //& deduct 1 credit from user

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },

        responseType: "arraybuffer",
      }
    );
    console.log(data);

    const base64Image = Buffer.from(data).toString("base64"); //&what is this binary?
    console.log(base64Image);

    const resultImage = `data:image/png;base64,${base64Image}`;
    console.log(resultImage);

    // user.creditBalance -= 1;//&deducting 1 credit from user or

    await User.findByIdAndUpdate(user._id, {
      $inc: { creditBalance: -1 },
    });

    return res.status(200).json({
      success: true,
      message: "Image generated successfully",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
