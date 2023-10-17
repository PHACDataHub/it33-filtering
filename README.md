# ITSG33 control panel

This project is aimed at helping people understand and use the [ITSG-33 control catalogue](https://www.cyber.gc.ca/en/guidance/annex-3a-security-control-catalogue-itsg-33).

## Dev environment

The project's dev environment is managed via [docker compose](https://docs.docker.com/compose/). Run `docker-compose up`
in the repo root to build and launch a full dev version of the site. The ui will be available at `localhost:3000`, the
api via `localhost:4000/graphql` and the database on `localhost:8529`.

The development docker containers watch for changes in both the host's `./ui` and `./api` src directories as well as their
`package-lock.json` files. Reinstalling node modules and reloading project servers occurs as appropriate.

Node modules are installed in a separate volume inside the containers, the host's node modules (if they exist) from
either project subdirectory are not used or modified. **Note:** if the host doesn't already have a `node_modules` directory
created in one of the project subdirectories, the docker containers will inadvertently create an empty, root-owned, `node_modules`
directory at those locations on the host file system. A weird little quirk. If this happens, you will likely get permission
errors when next trying to run `npm ci` etc on the host system, so delete those root-owned `node_modules` directories and
create your own (either manually or by running `npm ci` on the host OS). Once those directories exist on your system, subsequent
dev containers will not mess with them.

Currently, `./controls.json` is _not_ watched. To re-load the database with new data, the docker containers should be
taken down (ctl + C in the attached terminal) and re-launched (`docker-compose up`).
