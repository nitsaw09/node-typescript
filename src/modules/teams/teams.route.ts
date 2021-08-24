import express from 'express';
import { getTeams, findTeam, createTeams, updateTeams } from './teams.controllers';

const teamsRouter = express.Router();

teamsRouter.get("/", getTeams);

teamsRouter.get("/:team_name", findTeam);

teamsRouter.post("/", createTeams);

teamsRouter.put("/", updateTeams);

export default teamsRouter;