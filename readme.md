# Node application with typescript
```
node APIs to fetch and modify the teams data from src/data/football.json file

```

## APIs

1. Get All Teams
```
GET - http://localhost:3000/teams
```
2. Find Team
```
GET - http://localhost:3000/teams/{team_name}
```
3. Create Teams
```
POST - http://localhost:3000/teams

payload
{
    teams: [
        {
            name: 'Barcelona',
            img: 'http://barcelona.com/img.jpg'
        }
    ]
}
```
4. Update Teams
```
PUT - http://localhost:3000/teams

payload
{
    teams: [
        {
            name: 'Barcelona',
            img: 'http://barcelona.com/img.jpg'
        }
    ]
}
```

## Install dependencies
```
npm i
```

## Run application
```
npm start
```

## Run tests
```
npm test
```