module.exports = () => {
  const initParams = {};
  initParams.cache = randomIntNum(1, 5000);
  initParams.dynamicEntry = $.config.dynamicEntry && $.config.buildMode === 'prod';

  const options = {
    ignorePartials: true,
    batch: [
      `${$.config.sourcePath}/${$.config.hbsPath}/layouts`,
      `${$.config.sourcePath}/${$.config.hbsPath}/partials`,
    ],
    helpers: {
      times: function(n, block) {
        let accum = '';
        for (let i = 0; i < n; ++i)
          accum += block.fn(i + 1);
        return accum;
      },
      ifCond: function(v1, v2, options) {
        if (v1 === v2) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
      concat: function(...args) {
        return `${args.slice(0, -1).join('')}`;
      },
    },
  };

  $.gulp.task('hbs-prod', () => {
    const data = JSON.parse(
      $.fs.readFileSync(`${$.config.sourcePath}/${$.config.dbPath}/db.json`),
    );
    const links = JSON.parse(
      $.fs.readFileSync(`${$.config.sourcePath}/${$.config.dbPath}/links.json`),
    );
    const db = { ...initParams, ...data, ...links };

    return $.gulp.src([
      `${$.config.sourcePath}/${$.config.hbsPath}/pages/*.hbs`
    ])
      .pipe($.gulpPlugin.plumber())
      .pipe($.gulpPlugin.compileHandlebars(db, options))
      .pipe($.gulpPlugin.rename(path => {
        let string = path.basename;

        if (string.match('--')) {
          let newPath = string.split('--').join('/');
          path.dirname = `${newPath}`;
        } else if (!string.match('home')) {
          path.dirname = string;
        }

        path.basename = "index";
        path.extname = '.html';
      }))
      .pipe($.gulpPlugin.trim())
      .pipe($.gulp.dest(`${$.config.outputPath}`))
      .pipe($.bs.reload({ stream: true }),
      );
  });

  function randomIntNum(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
};
