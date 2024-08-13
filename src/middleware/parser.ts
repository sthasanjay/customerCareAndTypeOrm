import express from "express";
import { app } from "app";
import log from "logger";
import path from "path";

log.info("parser middleware added");
// Body parser, reading data from body into req.body

app.use(express.json({ limit: "1000kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

//serve static files
app.use(express.static(path.join("public")));
