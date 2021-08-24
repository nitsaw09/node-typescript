import { Request, Response } from 'express';
import { teamsData, modifyTeams } from '../../services/teams.service';
import Teams from '../../modals/teams.modal';

export const getTeams = async (req: Request, res: Response) => {
    try { 
        const data = await teamsData();
        res.statusCode = 200;
        res.send({ status: 'success', data });
    } catch (err) {
        res.statusCode = 500;
        res.send({ status: 'error', message: err.message });
    }
};

export const findTeam = async (req: Request, res: Response) => {
    try { 
        const { team_name } = req.params;
        const teamData = await teamsData();
        const data = teamData.find((d: Teams) => d.name === team_name);
        res.statusCode = 200;
        res.send({ status: 'success', data });
    } catch (err) {
        res.statusCode = 500;
        res.send({ status: 'error', message: err.message });
    }
};

export const createTeams = async (req: Request, res: Response) => {
    try { 
        const { teams } = req.body
        const teamData = await teamsData();
        for (let team of teams) {
            if (!teamData.find((d: Teams) => d.name === team.name)) {
                teamData.push(team);
            } else {
                throw new Error(`Team ${team.name} already exist`);
            }
        }

        const data = await modifyTeams(teamData);
        res.statusCode = 200;
        res.send({ status: 'success', message: 'Teams created successfully' });
    } catch (err) {
        res.statusCode = 500;
        res.send({ status: 'error', message: err.message });
    }
};

export const updateTeams = async (req: Request, res: Response) => {
    try { 
        const { teams } = req.body
        const teamData = await teamsData();
        for (let team of teams) {
            const index = teamData.findIndex((d: Teams) => d.name === team.name)
            if (index !== -1) {
                teamData[index].name = team.name;
                teamData[index].img = team.img;
            } else {
                throw new Error(`Team ${team.name} doesn't exist`);
            }
        }

        await modifyTeams(teamData);
        res.statusCode = 200;
        res.send({ status: 'success', message: 'Teams updated successfully' });
    } catch (err) {
        res.statusCode = 500;
        res.send({ status: 'error', message: err.message });
    }
};