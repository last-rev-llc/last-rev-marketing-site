Summary:
This file is a bash script that is responsible for building the application. It sets environment variables, runs pre-build and post-build scripts, and runs the build command. It also handles cleanup in case the build fails.

Dependencies:
This file depends on the .env file, pre_build.sh, post_build.sh, and yarn.

Code Summary:
- Set environment variables
- Run pre_build.sh script
- Run build command
- Run post_build.sh script if build fails
- If NODE_ENV is prod, output logs

Interaction Summary:
This file interacts with other scripts in the scripts directory, as well as the yarn package manager. It also sets environment variables that may be used by other parts of the application.

Developer Questions:
- What is the purpose of the pre_build.sh and post_build.sh scripts?
- What environment variables are being set and how are they being used?
- What is the purpose of the yarn propagate:env command?
- How does the build command work and what options are available?
- What happens if the build fails and the post_build.sh script is run?