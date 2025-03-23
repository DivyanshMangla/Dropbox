import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import File from '../models/File';
import { errorCodes, errorMessages, successMessages } from '../common/messages';

const router = Router();

// Configure storage for uploaded files. 
// Rememeber that the folder name given needs to be present inside src folder
const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, path.join(__dirname, `../../uploads`));
  },
  filename: (req, file, next) => {
    if (!file.originalname) {
      return next(new Error('File name is undefined'), '');
    }
    next(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filter for allowed file types.
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  next: multer.FileFilterCallback
) => {
  const allowedTypes = ['text/plain', 'application/json', 'image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    next(null, true);
  } else {
    next(new Error(errorMessages.file.notAllowed));
  }
};

const upload = multer({ storage, fileFilter });

// POST /upload: Upload a file.
router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(errorCodes.badRequest).json({ error: errorMessages.file.notGiven });
    }
    const {originalname, filename, size, mimetype} = req.file;
    // Converting the given file to required type so as to store it
    const fileData = new File({
      originalName: originalname,
      fileName: filename,
      size: size,
      mimetype: mimetype,
      uploadDate: new Date(),
    });
    await fileData.save();
    res.json({
      message: successMessages.file.uploadFile,
      file: fileData,
    });
  } catch (error) {
    console.error(error);
    res.status(errorCodes.unexpectedCondition).json({ error: errorMessages.file.uploadFile });
  }
});

// GET /files: List all uploaded files.
router.get('/files', async (req: Request, res: Response) => {
  try {
    const files = await File.find().sort({ uploadDate: -1 });
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(errorCodes.unexpectedCondition).json({ error: errorMessages.file.fetchFiles });
  }
});

// GET /file/:id: For Downloading the selected file.
router.get('/file/:id', async (req: Request, res: Response) => {
  try {
    const fileData = await File.findById(req.params.id);
    if (!fileData) {
      return res.status(errorCodes.notFound).json({ error: errorMessages.file.notFound });
    }
    const filePath = path.join(__dirname, '../../uploads', fileData.fileName);
    // downloads the file
    res.download(filePath, fileData.originalName);
  } catch (error) {
    console.error(error);
    res.status(errorCodes.unexpectedCondition).json({ error: errorMessages.file.getFile });
  }
});

// GET /file/view/:id: View file inline.
router.get('/file/view/:id', async (req: Request, res: Response) => {
  try {
    const fileData = await File.findById(req.params.id);
    if (!fileData) {
      return res.status(errorCodes.notFound).json({ error: errorMessages.file.notFound });
    }
    const filePath = path.join(__dirname, '../../uploads', fileData.fileName);
    //forces the browser to display the file instead of downloading it.
    res.setHeader('Content-Disposition', 'inline');
    // display the file directly in browser
    res.sendFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(errorCodes.unexpectedCondition).json({ error: errorMessages.file.viewFile });
  }
});

export default router;