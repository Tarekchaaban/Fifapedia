# ⚽ Fifapedia

A PERN-stack web application for soccer aficionados that want to keep track of their favorite teams, players, and their stats.

## :thinking: Why I built this

Leading up to the weeks of initial brainstorming for this project, I found myself rather worried about what I would do and how to even get started. I knew that in order for me to give it my 100% and be engaged throughout the development of the entire app, it would need to be something that I truly care for and want to build. That led me to none other than my sole love and passion, soccer. Thinking back to the days where I had more free time to watch soccer and play video games like FIFA, I realized that I never came across an app that combined the statistics from teams & players, across all teams regardless of international or club status - so I decided that I would create one of my own and thus Fifapedia was born!

### 🔗 Live Demo

Try the application live here: [fifapedia.fifapedia.app](https://fifapedia.fifapedia.app/)

## 💻 Technologies Used

### Languages
- HTML5
- CSS3
- JavaScript (ES6)
- SQL
- JSX

### Frameworks
- Node.js 
- React 
- Express.js 

### Packages
- Babel
- Webpack
- Argon2
- JSON Web Token
- Dotenv

## :open_book: Features
- Users can create an account
- Users can sign in
- Users can search international and club teams.
- Users can add team to a team list.
- Users can search for players by season from a team on their watch list.
- Users can view individual player stats.
- User can delete a team from their list.
- Users search gameday fixtures.
- Users can designate a team as their priority or favorite.
- Users can sign out

## :books: Stretch Features
- Users can look up league standings.
- Users can view betting odds and predictions on fixtures.

## :eyes: Preview

### User can add team to a team list.
https://user-images.githubusercontent.com/113570457/221845024-e245a310-834c-4694-b0ba-0208d19b42f0.mp4




### Users can search for players by season.
https://user-images.githubusercontent.com/113570457/221846630-23e035c7-df93-422e-8a12-2aa131a281f2.mp4



## :notebook: Features in Development
- Users can look up league standings.

## :man_technologist: Development

### Getting Started

1. Clone the repository
```
git clone https://github.com/Tarekchaaban/fifapedia.git
```
2. Install dependencies with Node Package Manager
```
npm install
```
3. Create a local .env file from provided example file
```
cp .env.example .env
```
4. Set the TOKEN_SECRET from 'changeMe' on your .env file
```
TOKEN_SECRET=changeMe <--
```
5. Start PostgreSQL
```
sudo service postgresql start
```
6. Create a database
```
createdb name-of-database
```
7. Update the DATABASE_URL in your .env file. Switch 'changeMe' to the name-of-database created
```
DATABASE_URL=postgres://dev:dev@localhost/changeMe?sslmode=disable
```
8. Start pgweb to view the database information
```
pgweb --db=name-of-database
```
9. Initialize the database with schema.sql and import any starting data from data.sql
```
npm run db:import
```
10. Start the project! Open a new terminal and run this script. Project can be viewed at http://localhost:3000 in your browser after running the command
```
npm run dev
```
