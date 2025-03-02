| connection dbFile |
dbFile := (Smalltalk imageDirectory / 'guilds.db') fullName.
connection := SQLite3Connection on: dbFile.
connection open.
"Table for guild resources"
connection execute: 'CREATE TABLE IF NOT EXISTS resources (
    id INTEGER PRIMARY KEY,
    name TEXT,
    amount INTEGER,
    changePerDay INTEGER
  );'.

"Table for guild members"
connection execute: 'CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY,
    name TEXT,
    role TEXT,
    tasks TEXT
  );'.
connection close.

| server |
(ZnServer defaultOn: 1701)
logToTranscript;
start.


handler := GuildAPI new.

ZnServer default delegate: handler.


ZnClient new 
  url: ZnServer default localUrl; 
  addPathSegment: #echo; 
  entity: (ZnEntity text: 'Hello'); 
  post.



  dbFile := (Smalltalk imageDirectory / 'guilds.db') fullName.
connection := SQLite3Connection on: dbFile.
connection open.
"Table for guild resources"
connection execute: 'CREATE TABLE IF NOT EXISTS resources (
    id INTEGER PRIMARY KEY,
    name TEXT,
    amount INTEGER,
    changePerDay INTEGER
  );'.

"Table for guild members"
connection execute: 'CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY,
    name TEXT,
    role TEXT,
    tasks TEXT
  );'.

cursor := connection execute: 'SELECT * FROM resources;'.

^cursor next.



TLWebserver teapot
    GET: '/api/resources' -> [
        | cursor rows |
        
        "Execute query"
        cursor := connection execute: 'SELECT * FROM resources;'.
        
    ]
	

