Summary:
This script is a pre-build script that prepares the graphql-runner package for a build. It removes the cms-sync folder from the .gitignore file and syncs CMS data if the graphql strategy is fs or not defined.

Dependencies:
This script depends on yarn and the turbo:sync:cms command.

Code Summary:
The script checks if the graphql strategy is fs or not defined. If it is, it removes the cms-sync folder from the .gitignore file and syncs CMS data. If not, it skips the sync.

Interaction Summary:
This script interacts with the graphql-runner package and the CMS data. It prepares the graphql-runner package for a build by ensuring that the cms-sync folder is not ignored during the build process. It also syncs CMS data if necessary.

Developer Questions:
- What is the purpose of the graphql-runner package?
- What is the purpose of the cms-sync folder?
- What is the turbo:sync:cms command?
- What happens if the .gitignore file cannot be fixed automatically?
- What happens if the cms-sync folder is not included in the build hash?