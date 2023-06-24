var mongoose = require("mongoose");
//SNqsdMI8ImV8mds8
const connect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(">>>>>>>>>> DB Connected!!!!!!"))
    .catch((err) => console.log(">>>>>>>>> DB Error: ", err));
};
module.exports = { connect };
