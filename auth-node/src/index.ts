import "module-alias/register";
import "./../polyfills";

import { app } from "@application/app";
import { logger } from "./application/logging";
import config from "@config/index";

const port = config.port;

app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});
