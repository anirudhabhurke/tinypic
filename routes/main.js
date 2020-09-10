const router = require('express').Router();

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

router.get('/', (req, res, next) => {
      res.render('index', {
            imagePath: null,
            message: null,
            danger: false,
            success: false,
      });
});

router.post('/', (req, res, next) => {
      const image = req.file;

      if (!image) {
            return res.render('index', {
                  imagePath: null,
                  message: 'Invalid file',
                  danger: true,
                  success: false,
            });
      }

      imagemin([image.path.replace('\\', '/')], {
            destination: 'images',
            plugins: [
                  imageminJpegtran({
                        progressive: true,
                  }),
                  imageminPngquant({
                        quality: [0.6, 0.8],
                  }),
            ],
      })
            .then((result) => {
                  res.render('index', {
                        imagePath: result[0].sourcePath,
                        message: 'Operation Successful',
                        danger: false,
                        success: true,
                  });
            })
            .catch((error) => console.log(error));
});

module.exports = router;
