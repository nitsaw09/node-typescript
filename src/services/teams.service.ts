import fs from 'fs/promises';
import path from 'path'; 
import Teams from '../modals/teams.modal';
import HttpException from '../common/http-exception';

const filePath = path.join(__dirname, '../data/football.json');

export const teamsData = () => {
    return fs.readFile(filePath, 'utf8')
        .then((data: string) => {
            return JSON.parse(data)
        })
        .catch((err: HttpException) => {
            throw new Error(err.message);
        });

};

export const modifyTeams = (data: Teams[]) => {
    return fs.writeFile(filePath, JSON.stringify(data), 'utf8')
        .then(() => {
            return data;
        })
        .catch((err: HttpException) => {
            throw new Error(err.message);
        })
}