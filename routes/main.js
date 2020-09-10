const router = require('express').Router();

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

router.get('/', (req, res, next) => {
      res.render('index', {
            imagePath: null,
      });
});

router.post('/', (req, res, next) => {
      const image = req.file;

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
                  });
            })
            .catch((error) => console.log(error));
});

module.exports = router;
