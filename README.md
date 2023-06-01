## Lenditt-Task

- ### Use Nodejs with (postgresql or mysql) 

- ## API - 1 
- Make an api where user’s contact get sync in one table 
- Duplicate contacts can not get saved in database
- Phone numbers should be encrypted in database

### Body
```
{
   { 
    userId: 1, 
    Contacts: [
        {“name”: “rahil”, “number”: “1234567890”},
        {“name”: “sahil”, “number”: “2234567777”},
        {“name”: “miten”, “number”: “1212123456”}
              ] 
    } , 
   {   
    userId: 2, 
    Contacts: [
        {“name”: “darshan”, “number”: “6657991246”},
        {“name”: “sahil”, “number”: “2234567777”}
              ]         
    } 
}
```
### Expected response 
```
{ 
“success”: true, 
“message” : data saved successfully
} 
```

### API - 2 
- Make an api to find common user for particular number 
- Query {“searchNumber”: “2234567777”} 
 
 ### Expected response 
```
{ 
“Name”: “sahil”, 
“commonUsers”: [1,2] 
} 
```

```
 Query {“searchNumber”: “6657991246”}
```

### Expected response 
```
{ 
“Name”: “darshan”, 
“commonUsers”: [2] 
}
```

## API - 3 

- Get contacts by userId 
- Pagination should work 
- Name search should work 
- Query {“userId”: 2, “page: 1, “PageSize”: 2} 

### Expected response 
```
{ 
“totalCount”: 3, 
“rows”: [ 
    {“name”: “rahil”, “number”: “1234567890”},
    {“name”: “sahil”, “number”: “2234567777”} 
     ] 
} 
```
```
{ 
“totalCount”: 1, 
“rows”: [ 
{“name”: “rahil”, “number”: “1234567890”} 
] 
} 
```

-
```
    Query {“userId”: 2, “page: 1, “PageSize”: 2 ,”searchText: “rah”} 
```


