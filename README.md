## _Before continuing_
This is a work in progress project. Some feature are still in progress. Thanks!

## That's delicious!
This is a project created by going through Wes Bos's [Learn Node](https://learnnode.com/) course.

In this course we built a 'yelp-like' restaurant application which users can search, review and curate their favorite restaurants from anywhere. 

The app consumes Google Maps API to allow for autocompletion in the register form and geo-location.

It touches many of today's application needs such as user authentication, database storage (using MongoDB, error handling, file upload and image resizing.

## Stack

- NodeJS
- Express
- MongoDB
- Google Maps API
- Pug
- Sass
- Passport
- Webpack

## Things I've learned
- Setting Cookie Parser and sessions
- Error handling using middlerare.
- Flash messages
- Using Mongoose Hooks and static methods.
- MongoDB Aggregations
- Uploading/resizing files using Multer and Jimp
- Webpack Bundling

## Sample Data

To load sample data, run the following command in your terminal:

```bash
npm run sample
```

If you have previously loaded in this data, you can wipe your database 100% clean with:

```bash
npm run blowitallaway
```

That will populate 16 stores with 3 authors and 41 reviews. The logins for the authors are as follows:

|Name|Email (login)|Password|
|---|---|---|
|Wes Bos|wes@example.com|wes|
|Debbie Downer|debbie@example.com|debbie|
|Beau|beau@example.com|beau|


