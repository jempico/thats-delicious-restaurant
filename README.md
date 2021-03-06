## _Before continuing_
This is a work in progress project. Some feature are still in progress. Thanks!

## That's delicious!
This is a project created by going through Wes Bos's [Learn Node](https://learnnode.com/) course.

In this course we built a 'yelp-like' restaurant application which users can search, review and curate their favorite restaurants from anywhere. 

For the front-end we've used Pug template engine.

It touches many of today's application needs such as user authentication, data validation, database storage, error handling, file upload, email sending and much more.

<img width="1269" alt="Screenshot 2021-08-07 at 17 10 48" src="https://user-images.githubusercontent.com/25463174/128604993-d9d583f0-4413-478c-b29e-9b72ab3f9d50.png">


<img width="1260" alt="Screenshot 2021-10-07 at 12 18 09" src="https://user-images.githubusercontent.com/25463174/136366165-11bdae4d-6a3c-489a-bb20-e1d6b235dd3c.png">




## Stack

- NodeJS
- Express
- MongoDB
- Pug
- Sass
- Passport
- MailTrap
- Webpack

## Things I've learned
- Error handling using middlerare.
- Flash messages
- User Accounts, Data validation and Authentication
- Mongoose Hooks and static methods.
- MongoDB Aggregations, Indexes
- Email verification flow
- Password reset flow
- Uploading/resizing files
- Pagination
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


