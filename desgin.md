# Intro

In this project i was requested to create an SDK to the https://the-one-api.dev/.

In order to implement it I created my private API key and ran it locally by creating 2 directories in my machine.
I connected them using npm link and ran it locally.

when I wanted to publish my package I ran npm publish.

# Design

Since this is my first SDK I had a dilemma on if I should store data in the SDK itself or just have it as a link between the user and the API. 
 
Eventually I decided to store the data in my SDK (since the API provides small size data assets and I wanted to allow the SDK to be as quick as possible).

I chose to design the SDK in classes where every the main class is the api client it holds information about the the api like the api key and general methods related to the API.

each category in the API extends the class to another class there is unique methods for each category and general data for each category is saved.

In order to avoid storing any sensitive data the user will provide his key to the API on runtime and the key will be saved in the API client, If the user wish to start the testing unit of the SDK he has to place a .env file in the package directory.

# Dependencies:

- dotenv: allows the SDK to use process.env during runtime.
- Axios: for easier API calls.
- Jest: this is the test library for the package.

pros for all three:
made it easier to use, allows me to write more simple, clean code. 

const for all three: 
create dependency for the package that will have to maintained 

# Future development:
something that I implemented only on one method is to use the API filtration and pagination better, the fact that my SDK holds part of the data after a fetch allows me to filter and paginate directly but I want to add that option directly from the API.

If i had to change something is to investigate further on SDK design usage and testing

# Self reflection:

I find it hard to rate this SDK:
 + it preform all the basic functions 
 + I feel that it is quite effective
 + it is successfully deployed
 - it lacks best practice when it comes to testing and SDK design

i'd give it 7 