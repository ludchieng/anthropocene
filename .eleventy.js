const fs = require('fs');
const path = require('path');
const root = path.dirname(require.main.filename) // TODO Find a better way
  .match(/(.*)[\\|\/].*[\\|\/].*[\\|\/].*/)[1]; // get grand-grand-parent


module.exports = function (config) {
  
  config.addWatchTarget("./src/**/slides/*");

  /* Collections */

  config.addCollection('courses', (collectionApi) => {
    return collectionApi.getAll()
      .filter((page) => page.data.layout === 'course')
      .sort((a, b) => (
        a.data.dir === b.data.dir
        ? 0
        : a.data.dir > b.data.dir
          ? 1
          : -1
    ))
  })

  /* Filters */

  config.addFilter('getSlides', (course) => {
    if (!course.match(/^[\w\- ]+$/))
      throw Error(`Invalid course name: ${course}`);

    return fs.readdirSync(`${root}/src/${course}/slides`)
      .map((url) => `${root}/src/${course}/slides/${url}`);
  });

  /* Passthrough copies */

  config.addPassthroughCopy("assets");
  config.addPassthroughCopy("styles");
  config.addPassthroughCopy("js");

  return {
    dir: {
      input: 'src',
      output: 'build',
      layouts: '_layouts',
      includes: '_includes',
      data: '_data'
    }
  };
};
