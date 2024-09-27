~ anything in " double quotes " spaced apart is a terminal command ~
~ when I reference 'DjangoReact' or its directory, this is simply what I named the folder this entire project is contained in ~

~ To Start website ~
You will need two terminals open, so if using vscode then split your terminal. They will also need to be in python's virtual env (see the following section)
In one terminal you will need to navigate to the 'backend' directory " cd backend "
    run " python manage.py runserver ", this will run the django backend
In the other terminal, you will need to navigate to the 'frontend' directory " cd frontend "
    run " npm run dev "

~ Python specific ~
Starting the python virtual environment (venv) via terminal:
    Windows cmd (from ~\DjangoReact\)
        " env/Scripts/activate.bat "
        if you prefer porwershell, activate.ps1 might work
    MacOS and Linux (from ~/DjangoReact/)
        " source env/bin/activate "
    " deactivate " to leave virtual environment
~ Most terminal work will be done here in the venv, so assume this unless otherwise stated ~

~ Django | Backend ~
Preparing django folders (will only have to do this once when starting a new django project)
    Outside the terminal, create a 'requirements.txt' file in the 'DjangoReact' directory, this contains all the dependencies this project needs. Not all projects will need all these requirements
        " pip install -r requirements.txt " to install said dependencies
    We will now create a 'backend' directory 
        " django-admin startproject backend "
    cd into this directory (cd backend), we will now create the 'api' folder which holds the django code to manage our database
        " python manage.py startapp api "
    Now outside the terminal, we need to move into backend/backend/settings.py
        This is the file containing all the settings for our django project
        Many specific steps occur here, so referencing the video @9:25 will be easier than reading steps here
            https://youtu.be/c-QsfbznSXI?si=nFXLq9tGanYtO73p&t=565
        
From here, the tutorial covers JSON Web tokens (JWT). Content is good, but they basically work like this:
    JWTs are tokens tied to user accounts that hold permissions and requests in the form of JSON to access the database. On the frontend, tokens are created after certain actions and sent to the database.
    The database will then observe the token and decide if it has permissions to the requested data and act accordingly.
    Tokens become invalid and new ones are created to prevent issues should an accounts token get leaked. After a period of time, said token would become useless and the leak would no longer matter.
    Django will handle most of the gritty work for JWTs, but its good to know how they work to understand how the frontend functions 

Creating the Registration view (This will be fairly generic and concepts will apply to all views)
    In 'DjangoReact/backend/api' we need to create a new file called 'serializers.py'
        Serializers act as translators from JSON to python code and vice versa
        It recieves JSON from our views and converts it into python (django) which will be used to access the database
        It can also react to python to return JSON back to the frontend after accessing the database
        Any later serializers will also be created within this file
    Next we open 'DjangoReact/backend/api/views.py'
        This file handles the views that are created in the frontend
        views take http requests, like clicking a link, and return http responses, like loading a new page
    Next we open 'DjangoReact/backend/api/urls.py' 
        This file contains all the directories users will go through when accessing different pages on the site

Migrating to database. This will connect what we've done so far to a database
    " python manage.py makemigrations "
        This will appear to do nothing rn. What it does is create a file that specifies the migrations that need to occur
    " python manage.py migrate "
        This will then apply the migrations and create the corresponding tables in the database
    These steps should be redone anytime a new database is used

Once migrated, a simple version of the app can be run
    " python manage.py runserver "
    This will create a very crude version using the premade django views
    At this point, you will also have to manually change the url to access different pages (eg: 127.0.0.1:8000/api/register)

Models
    Models are how django interacts with the database using python code
    Create and access models via 'DjangoReact/backend/api/models'
    Tables are created via classes named the table name, check models.py for examples
    Remember to create a serializer and view for created models using the same methods as above
        Note that previous methods used 'User' model which was predefined by django; so where 'User' was mentioned before, you would instead place the new model being created
        You will also have to make the proper imports in these files
    Also remember to migrate once again after modifying database tables

URLs
    You might notice there are two urls.py files, one in backend/backend/ and one in backend/api/.
    This is technically optional and the tutorial does this to organize things and keep the authentication urls in the backend/backend/urls.py file
        If this is done, you must link them as done backend/backend/urls.py at the commented line

CRUD Operations | views.py
    You may have noticed that views.py has Create and Delete operations within it. This is, in fact, where all CRUD operations will be called from via the url patterns in urls.py
    Tutorial mentions that the actual method calls should be found from django documentations, even he doesn't have all the methods memorized

~ React | Frontend ~
Setup / Install - These steps are setup and should only have to be done once upon starting a new project
    Make sure you are outside the backend directory, " cd .. " to navigate back a folder and into '~/DjangoReact/'
    " npm create vite@latest frontend -- --template react "
        This will create a 'frontend' directory with react installed
    cd into 'frontend' and run " npm install axios react-router-dom jwt-decode "
        This will install 3 packages (the last three phrases entered) into the 'frontend' directory
    Next he organizes some of the preset files that are created in this install
        He does a lot of small steps quickly so follow video @52:08-53:32 for more info

constants.js
    This is created because local storage will be used to store the access and refresh tokens in the browser
    The constants in this file act as a key to said storage

api.js
    This file will act as an 'Interceptor'
        Interceptors act to intercept any requests that are sent and will automatically add the correct headers to them. This means we don't have to rewrite so much code
        This is done via the axios interceptor

In the 'components' directory, create a new folder called 'ProtectedRoute.jsx'
    This file works as a front-end check for whether an account has access to certain pages using the JWTs in local storage.
    Not the most secure, but prevents people from accessing pages they shouldn't through links or modifying the url manually

In the 'pages' directory, create some pages. Home, Login, Register, and NotFound are good starts
    These pages will eventually load the html pages using javascript
        to start, a simple 'return <div>pageName</div>' can be used to make sure the page loads. This gets changed pretty quickly but if you're following along then it's nice to know it's working.
        remember to 'export default pageName' to allow importing into App.jsx

Now we can start working with App.jsx
    'function App()' will act to direct visitors to different pages of the website by calling functions made in the jsx files created in the 'pages' directory through imports
        This will get called by index.html as soon as the site is visited
    We can also create functions local to this file and call them, such as 'Logout()' and 'RegisterAndLogout()'

At this point, a simple demo can be run to make sure the react pages can be navigaeted to
    Run " npm install " to make sure node is installed properly
    Run " npm run dev " to start the server locally and attempt navigation
        Will still have to manually edit the url to start, but you can make sure pages load now

Now let's create the login and register forms. In 'components' create 'Form.jsx'
    These forms actually done as one form that sends requests based on how it was called, check the code for a better understanding
    Register.jsx and Login.jsx must also be modified to call the form

Next, we build up the homepage a little bit
    This involves setting up where you want components to go
    We also go ahead and create the form for Creating a note
        This will actually add the note to the database even though there's no way to read them yet
        Note: for some reason, this form won't work on firefox (and apparently IE). Works on chromium browsers though.

Finally, we can start working on the Notes portion of the tutorial
    Create Note.jsx in 'components' directory
        We would create a jsx for each object in our database that we want to display
    It will simply have a function named after itself with properties in the field
        This will return html that formats the content however you want
        Of course, you can style this with css as was done here too, just don't forget to import
    Once the Note.jsx is created, the object can be created in whatever page you want. In this case, the homepage will call it just below the 'Notes' header
        just call it and pass the necessary properties

At this point, I stopped following the tutorial to learn how to connect AWS rather than the databse system he uses