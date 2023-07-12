const fs = require ('node:fs');

fs.readFile('../NEW', "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });