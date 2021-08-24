import express, { Application, Request, Response, NextFunction } from 'express';
import HttpException from './common/http-exception';
import teamsRouter from './modules/teams/teams.route';

const app: Application = express();

app.use(express.urlencoded({ extended: false })) 
app.use(express.json()) 

app.use('/teams', teamsRouter);

// handling 404 error
app.use('*', (req: Request, res: Response) => {
    res.status(404).json({ status: 404, error: true, message: '404 Not Found' });
});
  
// handling client & server error response
app.use((error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const resStatus = error.status || 500;
    res.status(resStatus).json({
        status: resStatus,
        error: true,
        message: error.message
    });
    next();
});

app.listen(3000, () => console.log("Server Running"));

