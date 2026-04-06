zorvyn/
│
├── src/
│   ├── config/              # DB, env configs
│   │   └── db.js
│   │
│   ├── models/              # Mongoose schemas
│   │   ├── transaction.model.js
│   │   └── user.model.js
│   │
│   ├── controllers/         # Route logic 
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── transaction.controller.js
│   │   └── analytics.controller.js
│   │
│   ├── routes/              # Express routes
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── transaction.routes.js
│   │   └── analytics.routes.js
│   │
│   ├── middleware/          # Auth & role checks
│   │   ├── auth.middleware.js
│   │   ├── rateLimit.middleware.js
│   │   ├── error.middleware.js
│   │   └── role.middleware.js
│   │
│   ├── utils/               # Helpers
│   │   ├── apiResponse.js
│   │   ├── homeResponse.js
│   │   └── asyncWrapper.js
│   │
│   ├── validations/         # Input validation
│   │   ├── auth.validation.js
│   │   └── transaction.validation.js
│   │
│   ├── scripts/         # scripts
│   │   └── initData.js
│   │
│   ├── app.js               # Express app setup
│   └── server.js            # Entry point
│
├── .env
├── package.json
├── folderStructure.md
├── .gitignore
└── README.md