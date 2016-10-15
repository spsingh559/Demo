const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('test', () => {
  gulp.src(['**/*.spec.js','!node_modules/**/*'],{read:false}).pipe(mocha());
});
