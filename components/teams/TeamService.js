const binModel = require("../bins/BinModel");
const mangaModel = require("../mangas/MangaModel");
const teamModel = require("./TeamModel");

const addTeam = async (name, members, mangas) => {
  try {
    const team = {
      name,
      members,
      mangas,
    };
    await teamModel.create(team);
  } catch (error) {
    console.log("Add team service error" + error);
  }
  return false;
};
const getAllTeam = async () => {
  try {
    return await teamModel.find();
    // .populate('user')
    // .populate('manga')
  } catch (error) {
    console.log("Get All Team Service" + error);
  }
  return false;
};
const deleteTeamById = async (id) => {
  try {
    return await teamModel.findByIdAndDelete(id);
  } catch (error) {
    console.log("Delete Team by id error" + error);
  }
};
const getTeamById = async (id) => {
  try {
    const team = await teamModel
      .findById(id)
      .populate("user")
      .populate("manga");
    if (team) return team;
  } catch (error) {
    console.log("Get Team By Id Error" + error);
  }
  return null;
};
// pass team id and user id
// have to change role in user service
// user role: 0 , team role: 100, admin role: 1000
const deleteMember = async (teamId, memberId) => {
  try {
    const team = await teamModel.findById(teamId);
    if (team) {
      let index = team.members.findIndex((object) => object._id === memberId);
      team.members.splice(index, 1);
      await team.save();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Delete Member Service error" + error);
  }
  return false;
};
const deleteManga = async (teamId, mangaId) => {
  try {
    const team = await teamModel.findById(teamId);
    const manga = await mangaModel.findById(mangaId);
    if (team) {
      let index = team.mangas.findIndex((object) => object._id === mangaId);
      team.mangas.splice(index, 1);
      await team.save();
      await binModel.create(manga);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Delete Member Service error" + error);
  }
  return false;
};
module.exports = {
  addTeam,
  getAllTeam,
  deleteTeamById,
  getTeamById,
  deleteMember,
  deleteManga,
};
