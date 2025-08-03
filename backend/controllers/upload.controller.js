import { uploadSingle, deleteFile } from '../config/cloudinary.js';

const uploadImage = (req, res) => {
  uploadSingle(req, res, async (err) => {
    try {
      if (err) {
        console.error('Upload error:', err);
        return res.status(400).json({ 
          success: false, 
          message: 'Error uploading file',
          error: err.message 
        });
      }

      if (!req.file) {
        return res.status(400).json({ 
          success: false, 
          message: 'No file uploaded' 
        });
      }

      // File uploaded successfully
      res.status(200).json({
        success: true,
        message: 'File uploaded successfully',
        data: {
          url: req.file.path,
          public_id: req.file.filename,
          secure_url: req.file.path,
          format: req.file.format,
          bytes: req.file.bytes,
          width: req.file.width,
          height: req.file.height
        }
      });
    } catch (error) {
      console.error('Error in upload controller:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Server error during file upload',
        error: error.message 
      });
    }
  });
};

const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;
    if (!publicId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Public ID is required' 
      });
    }

    const result = await deleteFile(publicId);
    if (!result) {
      throw new Error('Failed to delete file from Cloudinary');
    }

    res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting file',
      error: error.message 
    });
  }
};

export { uploadImage, deleteImage };
