const pageModel = require("./PageModel");
const addPage = async (url) => {
  try {
    const page = {
      url,
    };
    await pageModel.create(page);
    return true;
  } catch (error) {
    console.log("Add page service error" + error);
  }
  return false;
};
const getPageById = async (id) => {
  try {
    return await pageModel.findById(id);
  } catch (error) {
    console.log("Get page by id error" + error);
  }
  return null;
};
const deleteById = async (id) => {
  try {
    return await pageModel.findByIdAndDelete(id);
  } catch (error) {
    console.log("Delete page by id error" + error);
  }
};
module.exports = { addPage, getPageById, deleteById };
