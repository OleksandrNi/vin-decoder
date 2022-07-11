# App for decode VIN number

[DEMO LINK](https://oleksandrni.github.io/vin-decoder/)

The application is designed to decipher the VIN code and obtain additional information on the variables

## Technologies used

 - React
 - React Hooks
 - React Router
 - Bootstrap
 - SASS
 - BEM

### Application functionality

Home page:
 - The validation form allows you to enter 17 characters, only numbers and Latin letters
 - Displaying an error code with a description if the VIN is incorrect according to the API response
 - Possibility to choose one of the last five successfully validated API VIN entries
 - Display Value information except for nulls and 'Not Applicable'

Variables page:
- Display of possible variables with an additional link to the possible variants of the variable
