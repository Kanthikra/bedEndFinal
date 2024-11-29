import express from "express";
import * as Sentry from "@sentry/node";
import "dotenv/config";

import logMiddleware from "../src/middleware/logMiddleware.js";
import propertiesRouter from "../src/routes/properties.js";
import bookingsRouter from "../src/routes/bookings.js";
import amenitiesRouter from "../src/routes/amenities.js";
import hostsRouter from "../src/routes/hosts.js";
import reviewsRouter from "../src/routes/reviews.js";
import usersRouter from "../src/routes/users.js";
import loginRouter from "../src/routes/login.js";
import errorHandler from "../src/middleware/errorHandler.js";

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({
      tracing: true,
    }),

    new Sentry.Integrations.Express({
      app,
    }),
  ],

  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use(logMiddleware);

app.use("/users", usersRouter);
app.use("/reviews", reviewsRouter);
app.use("/hosts", hostsRouter);
app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/properties", propertiesRouter);

app.use("/login", loginRouter);

app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
