const teamService = require("./TeamService");
const addTeam = async (name, members, mangas) => {
  return await teamService.addTeam(name, members, mangas);
};
const getAllTeam = async () => {
  return await teamService.getAllTeam();
};
const deleteTeamById = async (id) => {
  return await teamService.deleteTeamById(id);
};
const getTeamById = async (id) => {
  return await teamService.getTeamById(id);
};
const deleteMember = async (teamId, memberId) => {
  return await teamService.deleteMember(teamId, memberId);
};
const deleteManga = async (teamId, mangaId) => {
  return await teamService.deleteManga(teamId, mangaId);
};
module.exports = {
  addTeam,
  getAllTeam,
  deleteTeamById,
  getTeamById,
  deleteMember,
  deleteManga,
};
