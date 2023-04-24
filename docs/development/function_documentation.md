### Overview of the Folder Structure
```
backend
├── __tests__                   # API routes and functions test cases.
├── dist                        # Compiled files.
├── migrations                  # SQLite database schema
├── src                         # Source files
|
└── ...
```

### All Controllers Location
```
.
├── ...
├── src                    
│   ├── api               
│       ├── larch
|           ├── network
|           |   ├── controllers.ts # Here you can find all network controllers related functions  
|           ├── template
|           |   ├── controllers.ts # Here you can find all template controllers related functions      
|           ├── user_operation
|           |   ├── controllers.ts # Here you can find all user operation controllers related functions    
│           ├── version
|           |   ├── controllers.ts # Here you can find version controller function
|           └── ...
└── ...
```

### Database models and other useful modules.
```
.
├── ...
├── src                    
│   ├── modules
|       ├── models           
│       |    ├── exec_run.ts          # network run related databse queries    
│       |    ├── network.ts           # network operation related database queries
|       |    ├── template.ts          # template operation related database queries
|       |    └── user_operation.ts    # user operation related database queries
|       |
|       ...
|       ├── exec_run.ts               # network run related functions
|       ├── network.ts                # network operations related functions
|       ├── user_operation.ts         # user operation related functions
|       ├── zombienet.ts              # zombienet run or test process
└── ...
```