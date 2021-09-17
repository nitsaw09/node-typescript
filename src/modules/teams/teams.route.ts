import express from 'express';
import { getTeams, findTeam, createTeams, updateTeams, deleteTeams } from './teams.controllers';

const teamsRouter = express.Router();

teamsRouter.get("/", getTeams);

teamsRouter.get("/:team_name", findTeam);

teamsRouter.post("/", createTeams);

teamsRouter.put("/", updateTeams);

teamsRouter.put("/", deleteTeams);

export default teamsRouter;