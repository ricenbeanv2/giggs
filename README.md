#Giggs
Giggs is a job finding web application that allows those who are seeking for short term temporary jobs similar to freelancing to easily be connected to other users looking to hire amazing, hard working individuals who are right for the job. This web application allows the users to create an account traditionally through a sign up form or through a Facebook authentication. It also has an easy to use form to create job postings for employers, allows both employees and employers to have an easier time task managing current jobs that are active, and a job listings for users that can be sorted through price, category, and deadline and filtering through categories. Giggs has a map feature that is able to find the user's current location and mark all the available jobs surrounding the users along with a info box of the job that is available. Lastly, using Socket.IO, this application allows the users to stay connected with each other via chat. We hope you enjoy this as much as we enjoyed putting the effort and time to make this web application come to life.
## Environment Setup  
Firstly, we would want to install all the save dependencies. In the terminal, run the command line:
```
$ npm install

```
After the terminal finishes installing all the dependencies, in a separate tab run in the command line:
```
$ npm run bundle

```
Lastly, in the previous terminal where you have installed your dependencies, run in the command line:

```
$ npm run start

```
## Front-End
Client side of Giggs was mostly using React, Redux, Axios, BootStrap, and FontAwesome.
```
client
|
├── actions
│   ├── actionsTypes.js
|   |
│   ├── applicants.js
|   |
│   ├── auth.js
|   |
│   ├── categories.js
|   |
│   ├── chat.js
|   |
│   ├── jobs.js
|   |
|   └── review.js
|  
├── components
│   ├── account
|   |     ├── chat.js
|   |     |
|   |     ├── logout.js
|   |     |
|   |     ├── profile.js
|   |     |
|   |     ├── signIn.js
|   |     |
|   |     ├── signUp.js
|   |     |
|   |     ├── userApplications.js
|   |     |
|   |     ├── userJobPosts.js
|   |     |
|   |     └── userProfile.js
|   |
|   |── jobs
|   |     ├── reviews
|   |     |     ├── completedReview.js
|   |     |     |
|   |     |     ├── createReview.js
|   |     |     |
|   |     |     ├── getReviews.js
|   |     |     |
|   |     |     └── starReview.js
|   |     |
|   |     ├── applicantList.js
|   |     |
|   |     ├── applyJob.js
|   |     |
|   |     ├── createJob.js
|   |     |
|   |     ├── eachJob.js
|   |     |
|   |     ├── jobAdmin.js
|   |     |
|   |     ├── jobListings.js
|   |     |
|   |     ├── manageApplicants.js
|   |     |
|   |     ├── manageApplication.js
|   |     |
|   |     ├── reviewButton.js
|   |     |
|   |     └── selectedJob.js
|   |
│   ├── map
|   |   ├── infoBox.js
|   |   |
|   |   └── jobMap.js
|   |
│   ├── geoComponent.js
|   |
│   ├── inputBox.js
|   |
│   ├── NavBar.js
|   |
│   ├── renderField.js
|   |
|   └── selectionComponent.js
|
├── reducers
│   ├── applyReducer.js
|   |
|   ├── authReducer.js
|   |
|   ├── catReducer.js
|   |   
|   ├── chatReducer.js
|   |
|   ├── jobReducer.js
|   |
|   ├── mainReducer.js
|   |
|   ├── mapReducer.js
|   |   
|   └── reviewReducer.js
|
├── styles
|   ├── custom.css
|   |
|   └── styles.css
|
├── app.js
|   
├── index.html
|  
├── routes.js
|  
├── user.png
|
└── work.png
```

## Back-End
The sever side is mainly built with Express Node.js, mySQL, and Sequalize.
```
server
|
├── applicant
|   |
│   ├── applicantCtrl.js
|   |
|   └── applicantModel.js
|  
├── category
|   |
│   ├── categoryCtrl.js
|   |
│   ├── categoryData.js
|   |
|   └── categoryModel.js
|
├── config
│   ├── auth.js
|   |
|   ├── fbRoutes.js
|   |
|   ├── helpers.js
|   |   
|   ├── middleware.js
|   |
|   ├── routes.js
|   |   
|   └── sockets.js
|
├── db
|   └── connection.js
|
├── job
|   |
|   ├── jobCtrl.js
|   |   
|   └── jobModel.js
|   
├── messages
|   |
|   ├── messageCtrl.js
|   |   
|   └── messageModel.js
|
├── review
|   |
|   ├── employeeReviewsModel.js
|   |
|   ├── employerReviewsModel.js
|   |   
|   └── reviewCtrl.js
|   
├── user
|   |
|   ├── userCtrl.js
|   |   
|   └── userModel.js
|
└── server.js
```


## REST/CRUD Outline

```
ENDPOINT                                         METHOD         EXPECTED                              
──────────────────────────────────────────────   ─────────────  ────────────────────────────────────   
/db/auth/signup                                 |              |                                   |                                          
                                                |              | {                                 |
                                                │ POST         | 'username': some_userName,        │   
                                                │              │ 'password': '#HASHPASSWORD',      |
                                                |              |  }                                |
                                                │              │                                   │
/db/auth/signin                                 │ GET          │ {                                 │
                                                │              │  'username': 'some_userName',     │
                                                │              │  'password': '#HASHPASSWORD'      │
                                                │              │ }                                 │
/auth/facebook                                  | GET          |                                   |
                                                |              |                                   |
/db/users/update                                | POST         |  {                                |
                                                |              |  'username': 'some_userName',     |
                                                |              |  'password': '#HASHPASSWORD',     |
                                                |              |  'phone': 'XXX-XXX-XXXX',         |
                                                |              |  'name': 'Jane Doe',              |
                                                |              |  'email': 'jdoe@email.com'        |
                                                |              |  }                                |
                                                |              |                                   |
/db/users/:id                                   | GET          |  {                                |
                                                |              |   'username': 'some_userName',    |
                                                |              |   'password': '#HASHPASSWORD',    |
                                                |              |   'phone': 'XXX-XXX-XXXX',        |
                                                |              |   'name': 'Jane Doe',             |
                                                |              |   'email': 'jdoe@email.com'       |
                                                |              |  }                                |
                                                |              |                                   |
/db/jobs/create                                 | POST         |  {                                |
                                                |              |    'jobName': 'Name of Job',      |
                                                |              |    'openings': INT,               |
                                                |              |    'description': 'TXT'           |
                                                |              |    'category_id': INT,            |
                                                |              |    'address': 'House Address',    |
                                                |              |    'user_id': INT,                |
                                                |              |    'max_price': '$XXX',           |
                                                |              |    'location_lat': XX.X,          |
                                                |              |    'location_lng': XX.X,          |
                                                |              |    'address': '123 Sesame St.',   |
                                                |              |    'deadline': 'YYYY-MM-DD'       |
                                                |              |  }                                |
                                                |              |                                   |
/db/jobs/getAll                                 | GET          |  {                                |
                                                |              |    'jobName': 'Name of Job',      |
                                                |              |    'openings': INT,               |
                                                |              |    'description': 'TXT'           |
                                                |              |    'category_id': INT,            |
                                                |              |    'address': 'House Address',    |
                                                |              |    'user_id': INT,                |
                                                |              |    'max_price': '$XXX',           |
                                                |              |    'location_lat': XX.X,          |
                                                |              |    'location_lng': XX.X,          |
                                                |              |    'address': '123 Sesame St.',   |
                                                |              |    'deadline': 'YYYY-MM-DD'       |
                                                |              |  }                                |
                                                |              |                                   |
/db/jobs/getAll                                 | GET          |  {                                |
                                                |              |    'jobName': 'Name of Job',      |
                                                |              |    'openings': INT,               |
                                                |              |    'description': 'TXT'           |
                                                |              |    'category_id': INT,            |
                                                |              |    'address': 'House Address',    |
                                                |              |    'user_id': INT,                |
                                                |              |    'max_price': '$XXX',           |
                                                |              |    'location_lat': XX.X,          |
                                                |              |    'location_lng': XX.X,          |
                                                |              |    'address': '123 Sesame St.',   |
                                                |              |    'deadline': 'YYYY-MM-DD'       |
                                                |              |  }                                |
                                                |              |                                   |
/db/jobs/updateStatus                           |              |                                  |                                          
                                                |              |                                   |
                                                │ POST         |                                   │   
                                                │              │                                   |
                                                |              |                                   |
                                                │              │                                   │
/db/applicant/apply                             │ POST         │ {                                 │
                                                │              │  'user_id': INT,                  │
                                                │              │  'job_id': INT,                   │
                                                │              │  'bid_price': INT                 │
                                                |              | }                                 |
                                                |              |                                   |
/db/applicant/cancel                            | POST         |  {                                |
                                                |              |  'user_id': INT,                  |
                                                |              |  'job_id': INT                    |
                                                |              |  }                                |
                                                |              |                                   |
                                                |              |                                   |
                                                |              |                                   |
                                                |              |                                   |
/db/applicant/updateBid                         | POST         |  {                                |
                                                |              |   'user_id': INT,                 |
                                                |              |   'job_id': INT,                  |
                                                |              |   'bid_id': INT                   |
                                                |              |  }                                |
                                                |              |                                   |
                                                |              |                                   |
                                                |              |                                   |
/db/applicant                                   | GET          |  {                                |
                                                |              |   'user_id': INT,                 |
                                                |              |   'job_id': INT,                  |
                                                |              |   'bid_id': INT                   |
                                                |              |  }                                |
                                                |              |                                   |
                                                |              |                                   |
/db/applicant/changeStatus                      | GET          |  {                                |
                                                |              |   'job_id': INT,                  |
                                                |              |   'job_status': 'STATUS',         |
                                                |              |  }                                |
                                                |              |                                   |
                                                |              |                                   |
/db/applicant/getJobs                           | GET          |  {                                |
                                                |              |    'user_id': 'Name of Job'       |
                                                |              |  }                                |
                                                |              |                                   |
/db/category/getAll                             | GET          |                                   |
                                                |              |                                   |
                                                |              |                                   |
                                                |              |                                   |
                                                |              |                                   |
/db/category/query                              | GET          |                                   |
                                                |              |                                   |
                                                |              |                                   |
                                                |              |                                   |
/db/category/getParents                         | GET          |                                   |


```


## Giggs Team
[Sandy Tran](https://github.com/justsandytran)

[Calvin Lee](https://github.com/calvin337)

[Alberto Esquivias](https://github.com/GoDodgers)

[Tiffany Ip](https://github.com/tiffanyip)
