import fs from 'fs/promises';
import { Request, Response } from 'express';
import { getTeams, findTeam, createTeams, updateTeams } from './teams.controllers';

jest.mock('fs/promises');
const mockFs = fs as jest.Mocked<typeof fs>;

const teamsData = [
    {
        name: 'Arsenal',
        img: 'http://arsenal.com/img.jpg'
    },
    {
        name: 'Liver Pool',
        img: 'http://liverpool.com/img.jpg'
    }
];

const params = { team_name: 'Arsenal' };

const body = {}

describe('Teams', () => {  
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let responseData = {};
    beforeEach(() => {
        mockRequest = { params, body };
        mockResponse = {
            statusCode: 0,
            send: jest.fn().mockImplementation((result) => {
                responseData = result;
            })
        };
    });
    describe('Get all teams ', () => {
        it('should return all sport teams with status code 200', async () => {  
            const expectedResponse = { 
                status: 'success',
                data: teamsData
            };
            
            mockFs.readFile.mockImplementationOnce(
                (): Promise<any> => Promise.resolve(JSON.stringify(teamsData))
            );
            
            await getTeams(mockRequest as Request, mockResponse as Response)
            expect(mockResponse.statusCode).toBe(200);
            expect(responseData).toEqual(expectedResponse);
        });

        it('should throw error with status code 500', async () => {
            const expectedResponse = { 
                status: 'error',
                message: 'Something went wrong'
            };

            mockFs.readFile.mockImplementationOnce(
                (): Promise<any> => Promise.reject({ message: 'Something went wrong' })
            );

            await getTeams(mockRequest as Request, mockResponse as Response);
            expect(mockResponse.statusCode).toBe(500);
            expect(responseData).toEqual(expectedResponse);
        });
    });

    describe('Get team details', () => {
        it('should return team details with status code 200', async () => {  
            const expectedResponse = { 
                status: 'success',
                data: teamsData.find((d: any) => d.name === params.team_name)
            };
            
            mockFs.readFile.mockImplementationOnce(
                (): Promise<any> => Promise.resolve(JSON.stringify(teamsData))
            );

            await findTeam(mockRequest as Request, mockResponse as Response);
            expect(mockResponse.statusCode).toBe(200);
            expect(responseData).toEqual(expectedResponse);
        });

        it('should throw error with status code 500', async () => {
            const expectedResponse = { 
                status: 'error',
                message: 'Something went wrong'
            };

            mockFs.readFile.mockImplementationOnce(
                (): Promise<any> => Promise.reject({ message: 'Something went wrong' })
            );

            await findTeam(mockRequest as Request, mockResponse as Response);
            expect(mockResponse.statusCode).toBe(500);
            expect(responseData).toEqual(expectedResponse);
        });
    });

    describe('Create teams', () => {
        it('should create teams with status code 200', async () => {  
            mockRequest.body = {
                teams: [
                    {
                        name: 'Barcelona',
                        img: 'http://barcelona.com/img.jpg'
                    }
                ]
            }

            const expectedResponse = { 
                status: 'success',
                message: 'Teams created successfully'
            };

            mockFs.readFile.mockImplementationOnce(
                (): Promise<any> => Promise.resolve(JSON.stringify(teamsData))
            );
            
            mockFs.writeFile.mockImplementationOnce(
                (): Promise<any> => Promise.resolve(teamsData)
            );

            await createTeams(mockRequest as Request, mockResponse as Response);
            expect(mockResponse.statusCode).toBe(200);
            expect(responseData).toEqual(expectedResponse);
        });
        
        it('should throw error if team already exist with status code 500', async () => {
            mockRequest.body = {
                teams: [
                    {
                        name: 'Arsenal',
                        img: 'http://arsenal.com/img.jpg'
                    }
                ]
            }
            
            const expectedResponse = { 
                status: 'error',
                message: `Team ${params.team_name} already exist`
            };

            mockFs.readFile.mockImplementationOnce(
                (): Promise<any> => Promise.resolve(JSON.stringify(teamsData))
            );

            await createTeams(mockRequest as Request, mockResponse as Response);
            expect(mockResponse.statusCode).toBe(500);
            expect(responseData).toEqual(expectedResponse);
        });

        it('should throw error with status code 500', async () => {
            mockRequest.body = {
                teams: [
                    {
                        name: 'Barcelona',
                        img: 'http://barcelona.com/img.jpg'
                    }
                ]
            };

            const expectedResponse = { 
                status: 'error',
                message: 'Something went wrong'
            };

            mockFs.readFile.mockImplementationOnce(
                (): Promise<any> => Promise.resolve(JSON.stringify(teamsData))
            );

            mockFs.writeFile.mockImplementationOnce(
                (): Promise<any> => Promise.reject({ message: 'Something went wrong' })
            );

            await createTeams(mockRequest as Request, mockResponse as Response);
            expect(mockResponse.statusCode).toBe(500);
            expect(responseData).toEqual(expectedResponse);
        });
    });

    describe('Update teams', () => {
        it('should update teams with status code 200', async () => {  
            mockRequest.body = {
                teams: [
                    {
                        name: 'Arsenal',
                        img: 'http://arsenal.com/img1.jpg'
                    }
                ]
            }

            const expectedResponse = { 
                status: 'success',
                message: 'Teams updated successfully'
            };

            mockFs.readFile.mockImplementationOnce(
                (): Promise<any> => Promise.resolve(JSON.stringify(teamsData))
            );
            
            mockFs.writeFile.mockImplementationOnce(
                (): Promise<any> => Promise.resolve(teamsData)
            );

            await updateTeams(mockRequest as Request, mockResponse as Response);
            expect(mockResponse.statusCode).toBe(200);
            expect(responseData).toEqual(expectedResponse);
        });
        
        it(`should throw error if team doesn't exist with status code 500`, async () => {
            mockRequest.body = {
                teams: [
                    {
                        name: 'Barcelona',
                        img: 'http://barcelona.com/img.jpg'
                    }
                ]
            }
            
            const expectedResponse = { 
                status: 'error',
                message: `Team Barcelona doesn't exist`
            };

            mockFs.readFile.mockImplementationOnce(
                (): Promise<any> => Promise.resolve(JSON.stringify(teamsData))
            );

            await updateTeams(mockRequest as Request, mockResponse as Response);
            expect(mockResponse.statusCode).toBe(500);
            expect(responseData).toEqual(expectedResponse);
        });

        it('should throw error with status code 500', async () => {
            mockRequest.body = {
                teams: [
                    {
                        name: 'Arsenal',
                        img: 'http://arsenal.com/img.jpg'
                    }
                ]
            };

            const expectedResponse = { 
                status: 'error',
                message: 'Something went wrong'
            };

            mockFs.readFile.mockImplementationOnce(
                (): Promise<any> => Promise.resolve(JSON.stringify(teamsData))
            );

            mockFs.writeFile.mockImplementationOnce(
                (): Promise<any> => Promise.reject({ message: 'Something went wrong' })
            );

            await updateTeams(mockRequest as Request, mockResponse as Response);
            expect(mockResponse.statusCode).toBe(500);
            expect(responseData).toEqual(expectedResponse);
        });
    });
});