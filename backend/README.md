Make sure you have "python 3.12.6" installed. (check version by doing "python3 --version") Then use:
"python3 -m ensurepip --upgrade"
to install pip, the package manager for python.

We are using a venv to provide version control for our project dependencies. I suggest doing this for every python project you write down the road instead of installing dependencies globally. It prevents version conflicts between different pieces of software.

After installing python and pip, you need to set up the venv locally. in ssh-senior-design/backend, create a subdirectory "venv". Then to instantiate the venv, use:
"python3 -m venv ./venv"
Next, you must activate the venv which will use a separate python and pip application from your global installation.
Lauren (Mac/Linux): "source ./venv/bin/activate"
Nick and Elliott (Windows Powershell): call "venv\Scripts\Activate.ps1"

Finally, you can install the dependencies for our project. At the moment, the only dependencies are FLASK and its dependencies. To install them, use:
"pip install -r requirements.txt"

To add a new dependency, install it with pip with the venv activated and then use:
"pip freeze > requirements.txt"
This will add the package to the list.

When you are done working on the backend, simply use:
"deactivate"
to exit.
