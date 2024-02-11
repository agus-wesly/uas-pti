const allowedOrigins = ["http://localhost:3000", "https://secret-ly.netlify.app"];

const corsOption = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      return callback(null, true);
    } else {
      var msg = "The CORS policy for this site does not " + "allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
  },
};

module.exports = { corsOption, allowedOrigins };
