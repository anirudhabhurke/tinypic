const router = require('express').Router();

const tinify = require('tinify');
tinify.key = process.env.TINYPNG_API_KEY;

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

      const imagePath = image.path;

      const source = tinify.fromFile(imagePath);
      source.toFile(imagePath)
            .then(() => {
                  res.render('index', {
                        imagePath: image.path,
                        message: 'Operation Successful',
                        danger: false,
                        success: true,
                  });
            })
            .catch((error) => console.log(error));
});

module.exports = router;
