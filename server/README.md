## About Server

### Server

The reviewer of this project does not have to run the server, because the server is already running on 'http://it2810-09.idi.ntnu.no:4000/project2/'. Everything that has to be done to run our appliaction is explained in the [Client README](../client/README.md).

NTNU's website hosts the server. This server's primary functions include retrieving data from the database and transmitting it to clients. Additionally, it manages client requests, such as adding comments and storing/filtering/searching the in the database.

### Database

For this project, we employed MongoDB as our chosen database system. The database resides on NTNU's server, accessible solely within NTNU's network. It houses a collection over 300 movies. Alongside movies information, the database also stores user-generated favorites.

### Queries and mutations

This is the queries and mutations we have implemented to the project.

```code
  type Query {
    getMovies(skip: Int, limit: Int): [Movie]
    getMovie(ID: Int!, userID: String!): Movie
    getGenre(ID: Int!): Genre
    getFilteredMovies(genre_id: Int, skip: Int, limit: Int, search: String, sortValue: String, userID: String): [Movie]
    getFavoritesByUserID(userID: String): [Movie]
    isFavorite(userID: String, id: Int): Boolean!
    getFilteredMoviesCount(genre_id: Int, search: String, sortValue: String): movieCount
    getAllComments(movieID: Int!): [Comment]
    getAllGenres: [Genre]
  }

  type Mutation {
    addComment(id: Int!, comment: String!, userID: String): Comment
    addFavorite(userID: String!, id: Int!): User
    removeFavorite(userID: String!, id: Int!): User
    addUser(userID: String!): User
  }
```

## How to run server locally

Make sure the uri in client/main.tsx is "http://localhost:4000/":

```bash
const client = new ApolloClient({
  uri: 'http://it2810-09.idi.ntnu.no:4000/project2/',
  cache: new InMemoryCache(),
});
```

Navigate to the "server" directory:

```bash
cd server
```

Install the required dependencies by running:

```bash
npm install
```

Start the client by executing this command within the "client" directory:

```bash
npm run start
```

the server is now running at http://localhost:4000/

If you are having additional problems, please install the following package:

````bash
npm i @apollo/server

## Env file

To protect our database from unwanted inference, we have each included an .env file which is not included on git.
We used this file when we tested and ran our project locally on http://localhost:4000/.
The project will not be able to run locally for a non-developer on this project, therefore we have
the server running at "http://it2810-09.idi.ntnu.no:4000/project2/" so this will not affect when other
people are going to view our project.

### Additional commands

#### Linting:

The following command runs ESLint to check TypeScript for errors and code issues. It also identifies and reports any unused ESLint-disable directives.

```bash
npm run lint
````

#### Auto-fix Lint Errors:

This command allows you to automatically fix some of the lint errors and warnings, enhancing the overall code quality. Use the --fix flag to enable this feature.

```bash
npm run lint -- --fix
```
