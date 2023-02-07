# Hike Trail Website

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Summary
My application will show where all the hikes are on a map and give a little inforation about each hike or trail. I built an API that will allow users to add new hikes with different levels of authentication. The application itself will use an API for the user for the site as well. When a user signs up they can save and delete hikes. 

## Functionality 
The application shows a map with all the hikes save in the Hikes API with the plan of adding more as the site is used. The user will have fuctions added once they sign up for the site: 
  - Update their account
  - Delete their account
  - Links to trails with more information
  - Save/Remove trials to your account

## Webpage
Link to [Hike Site](http://hike-trails.surge.sh/)

## APIs

- [User API](https://github.com/salazarje1/hikeusers-api)
- [Trails API](https://hike-trail.online)
- [Mapbox](https://docs.mapbox.com/#maps)

## Testing 
Most of the test added to my application are on the User API. To run the test:
  1. Move into the the User API directory 
  2. Run 'jest' from the terminal 

## Bugs 
There are serveral bugs and unfinished section of my application that will be added: 
  1. Login/Signup there are no alerts for errors on the form. 
  2. Login sometimes won't log you in. 
  3. Hike API doesn't have authentication.
  4. Hike API possibly adding auth keys and email system
  5. User API doesn't have authentication. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


