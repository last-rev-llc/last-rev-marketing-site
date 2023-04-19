Summary:
This file is a bash script that sets environment variables, runs a cleanup function, and starts a development server. It also syncs CMS data if the GraphQL runner strategy is "fs" or if it is not defined.

Dependencies:
This file depends on the .env file and the Turbo CLI.

Code Summary:
- The script sets the -a option to export all variables to the environment of subsequently executed commands.
- It sources the .env file or prints an error message if it is not found.
- It sets the +a option to turn off the -a option.
- It defines a cleanup function that kills the GraphQL server and exits with the return value of the last executed command.
- It sets a trap to call the cleanup function when the script exits.
- It prints a message that the development server is starting.
- It runs the propagate:env script from the Turbo CLI to propagate environment variables to the client.
- If the GraphQL runner strategy is "fs" or not defined, it runs the sync:cms script from the Turbo CLI to sync CMS data.
- It runs the dev script from the Turbo CLI with the output-logs option set to new-only.

Interaction Summary:
This file interacts with the rest of the application by setting environment variables, syncing CMS data, and starting a development server. It depends on the .env file and the Turbo CLI. Other parts of the application may depend on the environment variables set by this script or may interact with the development server started by this script.

Developer Questions:
- What environment variables are set by this script and how are they used in the rest of the application?
- What is the purpose of the cleanup function and how does it work?
- What is the purpose of the propagate:env script and how does it work?
- What is the purpose of the sync:cms script and how does it work?
- What is the purpose of the dev script and what options can be passed to it?
- How does the development server started by this script interact with other parts of the application?
- What other scripts or files depend on the environment variables set by this script?