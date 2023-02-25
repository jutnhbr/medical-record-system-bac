# Medical Record System with built in Broken Access Control and LFI

This repo contains a Web Application built with ReactJS and ExpressJS. It uses PasswortJS for authentication and password hashing. All data is stored inside a MongoDB. The System represents a Hospital Medical Record System with three user roles: Patient, Doctor and Admin.
The Patient only has access to its own medical record while the Doctor can see and manage records of all his patients. The admin is able to see, create and update the user accounts.


## Implementation of Local File Inclusion
The Server stores all medical records locally inside a /data/records folder which is also visible to the user, since it is shown in the URL to direct the user in the right direction for the attack. We modified the GET endpoint the return any requested file without checking if the patient is currently fetching its own medical record or any medical record in general. Next to the /records folder exists a /logs folder with a logs.txt Server Log File in it. If the attacker modifies the URL it is possible to let the server return the log files to get more insights about all server routes and who used them in the past.

## Implementation of Broken Access Control
We used passportJS to authenticate the user and based on the user object stored inside the session storage, we define whether or not the user has access to specific routes with a small access checking module. But we did it in an irregular way so that not all routes are correctly checking the permissions. While the patient can not directly access the admin dashboard, he can navigate to a /reauth route which is a Intermediary route between the dashboard and the actual form where the admin can edit all users. This route is only checking if the used credentials are valid without validating the user role, which makes it possible to get access to the user management board without admin rights. There, the user may not be able to edit other users, since the access management is working in this section. But he is able to steal different patientIDs. With a stolen ID the attacker can go back to his own patient dashboard and switch its own ID in the URL with the stolen one to get access to a foreign medical record.

## Summary of the attack
1. The attacker is a patient and has access to a patient account.
2. Log in as a patient
3. While logging in check the developer console and observe the network tab. You can check what kind of server is running in the background to get your first information about the application
4. Modify the URL from /data/records/recordXXXXXX to /data/logs/logs.txt
5. Observe the used routes by other users and try out a few of them
6. You notice that the admin always uses a /reauth route before actually accessing the /usrmgmt dashboard
7. Navigate to the /reauth route and enter your own credetials
8. You now have access to the management dashboard. 
9. You try to edit another user which is not working because you dont have any permissions
10. You copy a foreign patient ID
11. You navigate back to your own patient dashboard an replace your ID with the stolen one
12. You now have access to a stolen record file

# How to run this Application
### Run on a Virtual machine
If you want to test and use this application on a virtual machine, follow our readme inside this repositry: https://github.com/mdvoryad/medical-record-system-bac-make-VM
It provides a short tutorial and a Shell Script to automatically initilize and start the Application.

### Run locally on the system

1. Make sure you have NodeJS, NPM, MongoDB and the MongoDB CLI installed. If not follow the tutorials of the according services.
2. Clone this repo
3. We provided the relevant .env file with a DB connection String and a passport secret. You can configure the String to your liking
4. If MongoDB is not running as a service / daemon on your machine, you can start it with the following command (On Windows): ```mongod --dbpath *PATH TO YOUR DB/DATA FOLDER* (Standard path is C:\data\db)```
5. Run the initDB Script to fill the Database with predefined users of all roles.
6. Navigate to the Server Directory and install all dependecies with ```npm install```
7. Start the backend with ```npm run dev```
8. Navigate to the Client Directory and install all dependecies with ```npm install```
9. Start the Frontend with ```npm run start```
10. The Frontend might ask you the start the application on port 3001 since 3000 is already in use. Accept with ```y```
11. The Application is now available on ```localhost:3001```
12. You can find all Patient, Admin and Doctor logins inside the initDB.js Script
