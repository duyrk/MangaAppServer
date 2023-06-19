const pageService = require("./PageService");
const addPage = async () => {
  return await pageService.addPage();
};
const getPageById = async (id) => {
  return await pageService.getPageById(id);
};
const deleteById = async (id) => {
  return await pageService.deleteById(id);
};
module.exports = { addPage, getPageById, deleteById };
