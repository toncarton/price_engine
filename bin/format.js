const fs = require('fs');
const path = require('path');

const files = process.argv.slice(2);

if(files[0] === undefined || files[1] === undefined) {
  console.log('please indicate the source and destination file');
  console.log('format path_to_src_file path_to_destination_file');
  process.exit(1);
}

var grille = require(files[0]);

const grilleFunctionString = grille.toString();
const grilleFunctionBody = grilleFunctionString
      .slice(grilleFunctionString.indexOf("{") + 1, grilleFunctionString.lastIndexOf("}"));

const pathfile = path.resolve(files[1]);
fs.writeFile(pathfile, grilleFunctionBody,function (err) {
  if (err) return console.log(err);
  console.log('Hey !, Build DONE, see =>' + files[1]);
});
