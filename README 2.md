#Eatie for Austin

##Description
This app was inspired by the belief that people want to experience the city they are visiting from a local's point of view while still enjoying the best food the city has to offer. The app will suggest the best restaurants in the city along with exactly what to order. The idea is meant to be a replacement for asking for suggestions on social media from friends living in Austin and other destination cities. It will have a sharing option so you can share your experiences at the restaurants and see others' posts too!

##Wireframes
[Wireframes](https://alexaraes.mybalsamiq.com/projects/eatieaustin/grid)

##User Stories
[My Trello board](https://trello.com/b/P7rAF2BL/eatie-austin)


##Models
####User Model
User Model has a a many-to-many relationship with the restaurant model<br/>
```
firstName: string, null, required
username: string, null, required,
password: string, null, required,
email: string, null, required,
userId: string, null, required,
createdAt: number, Date.Now(), required
loggedIn: boolean, false, required
loggedOut: boolean, true, required
```
####Suggestion Model
The Suggestion Model has a many-to-many relationship to the User Model
```
restaurant: string, null, required
id: string, null, required
createdAt: number, Date.Now(), required
product: string, null, required
address: string, null, required
category: string, null, required
latitude: number, null, required
longitude: number, null, required
```
####Post Model
The Post Model has a many-to-many relationship to the User Model and the Suggestion Model
```
userId: string, null, required
id: string, null, required
createdAt: number, Date.Now(), required
image: string, null, required
caption: string, null, required
suggestionId: sting, null, required
```

Validation will be needed for login and sign-up

##APIs, Plugins, Libraries and Frameworks
<strong>Frameworks:</strong> React.js, Backbone.js<br/>
<strong>Libraries</strong>: jQuery, Validator.js <br/>
<strong>APIs:</strong> Google Maps, Parse <br/>
[Google Maps API Hello World](https://github.com/alexaraes/maps-helloworld)
```
```
###Contact Me
<strong>Twitter:</strong> [@Awrecksa](http://www.twitter.com/awrecksa)<br />
[LinkedIn](https://www.linkedin.com/pub/alexa-schreffler/bb/526/544)
