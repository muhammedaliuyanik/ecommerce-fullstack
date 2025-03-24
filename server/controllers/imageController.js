import fs from 'fs';
import FormData from 'form-data';
import userModel from '../models/userModel.js';


const removeBgImage = async (req, res) => {
  try {
    const { clerkId } = req.body;

    const user = await userModel.findOne({ clerkId });
    if (!user) {
      return res.json({ success: false, message: 'User Not Found' });
    }

    if (user.creditBalance === 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance });
    }

    const imagePath = req.file.path;


    const imageFile = fs.createReadStream(imagePath);

    const formdata = new FormData();
    formdata.append('image_file', imageFile);


    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;


    await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });


    res.json({ success: true, message: "Background Removed", resultImage, creditBalance: user.creditBalance - 1 });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { removeBgImage };
