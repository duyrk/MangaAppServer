var mongoose = require('mongoose');
//SNqsdMI8ImV8mds8
const  connect = () =>{
    mongoose.connect('mongodb+srv://raiko:Chitoge1507@mangacluster0.izobbty.mongodb.net/', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
        .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
        .catch(err => console.log('>>>>>>>>> DB Error: ', err));
}
module.exports = {connect}