User Guide

Step 1: Download your preference of database system (MySQL or Maria preferred)
https://dev.mysql.com/downloads/installer/
https://mariadb.com/downloads/

Step 2: Open preferred Code Editor
https://code.visualstudio.com/download

Step 3: Clone project folder from https://gitlab.com/stevenacorrea/fa20-cs36-project.git 
cmd: git clone git@gitlab.com:stevenacorrea/fa20-cs36-project.git

Step 4: Follow the Installation Guide

Step 5: Open a cmd prompt or terminal for steps 6 and 7 

Step 6: Create user and table csci36 in database system
cmd: create user ‘csci36’ identified by ‘csci36’;

Step 6: Grant full access to user  
cmd: grant all on csci36.* to ‘csci36’;

Step 7: Navigate to the project’s folder on code editor
cmd: cd .\fa20-cs36-project-master

Step 8: Run scraper in code editor, cmd prompt, or 
cmd: node .\server.js

Step 9: Navigate to http://localhost:5000

Step 10: Select from the following options to view organized and scraped data 

Disclaimer: You are able to view scraped data locally from your database system by running the following commands.
use csci36;
show tables; 
Select from the following tables: select * from (insert table name here);   
http://localhost:5000 is a more user friendly way around that. It is more organized and was required for this project. 
