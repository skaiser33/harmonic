# Harmonic

## Deployed At:
http://harmonic.herokuapp.com

## Description

The Harmonic app allows logged-in users to search the user-base for solo musicians or bands for recording, performances, or long-term collaborations. Immediately after signup, the user will be asked to complete a detailed profile. 

The heart of the app is the search page, where the user can set filters in a form with checkboxes and dropdown menus (ie: "I am looking for a musician in L.A. who plays bass and can record remotely"  or "I am looking to join a metal band that needs a drummer and lists Slayer as an influence") and see a list of musicians or bands matching the search criteria. 

From this index of search results, the user can select a band/musician from the list and be redirected to that user's detailed profile page. The profile page allows the user to add the band/musician to favorites with a "star", give a testimonial, contact the band/musician through in-app messaging, or return to search results. The index page will also allow the user to edit the search criteria or save the search parameters for future use.


## Technologies Used
- Express
- Sequelize
- Postgres
- EJS
- CSS
- Boostrap
- HTML
- VSCode
- Google Chrome Developer Tools

## User Stories
As a user, I want:

- to create a secure account and be logged in automatically. 
- to log in securely and log out when I am done using the app.
- an intuitive and clean UI with a responsive design that is equally user-friendly on mobile devices and desktop screens.
- to set up a detailed musician/band profile that includes instruments played, influences, genre(s), credits, and embedded audio/video.
- to search the user-base for solo musicians or bands for recording, performances, or long-term collaborations using collaboration-type filters.
- to select a band/musician from the search results and be redirected to that user's detailed profile page.
- to add a band/musician to my favorites with a "star", give a testimonial, and contact the band/musician through in-app messaging.
- to save my search parameters for future use.


## Installation Steps
- Fork and clone Github repo. 
- Install all npm packages. ```npm install```
- Create .env file and populate your own keys based on the .env_template file included in the cloned repo.
- Run the following commands in your terminal to create the database and migrate the models:
  ```createdb harmonic```
  ```sequelize db:migrate```
  ```sequelize db:seed:all``` (optional -- a seed file has been provided to help you get up and running)


## Data Models and ERD

![Data Models and ERD](https://i.imgur.com/lhjZxMb.png)


## Major Hurdles
- Properly scoping a full-stack solo project within a week. 
- Unanticipated limitations to certain Sequelize queries. 
- The complexities of certain form interactions with database queries. 

## Major Victories
- While I wasn't able to execute all scoped features, the major components of the app are all present is some form. 
- Though I have a ways to go, CSS is starting to feel less intimidating.
- I've enjoyed thinking about how to launch an app like this. (ie: an invite-only pre-launch registration to establish sufficient userbase, paid tiers with extra features and unpaid tiers with ads, sponsorship/partnership with a company like Guitar Center)
- This is an app I would use!

## Future Goals
- A more refined messaging feature, possibly incorporating real-time chat. 
- A single user will be able to have multiple profile types (ie: a musician who plays in a band but is open to other projects). 
- There will be a profile category for music professionals (ie: managers, producers, music directors).
- Users will  be able to see LinkedIn-style connections.
- Testimonials will require user approval before being displayed on that user's page.
- "Unfavorites" feature so that users can prevent musicians/bands from coming up in future search results. 
- More extensive front-end error validation.
- Further refinement of styling and responsive design.
- Welcome email for new users.
- Third-party / Oauthlogin capabilities.
- Refactoring for more concise code.



## Screenshots

Home Page

![Home Page](https://i.imgur.com/GyMNY8y.jpg)


About Page

![About Page](https://i.imgur.com/srlpM2U.jpg)

Search Page

![Search Page](https://i.imgur.com/pOmyHIC.jpg)


Messages Page

![Messages Page](https://i.imgur.com/IEEOVSs.png)


## Original Wireframes

Search Page

![Search Page](https://i.imgur.com/6quKZP2.jpg)

Profile Page

![Profile Page](https://i.imgur.com/UtTT2Tp.jpg)