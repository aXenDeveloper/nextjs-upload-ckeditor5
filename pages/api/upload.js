import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname)
  })
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
});

apiRoute.use(upload.array('upload'));

apiRoute.post((req, res) => {
  res.status(200).json({ uploaded: true, url: `http://localhost:3000/uploads/${req.files[0].filename}` });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false
  }
};
