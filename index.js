"use strict";

const _ = require("underscore");
const Router = require("@arangodb/foxx/router");
const errors = require("@arangodb").errors;
const joi = require("joi");
const router = Router();
const todos = module.context.collection("todos");
const DOC_NOT_FOUND = errors.ERROR_ARANGO_DOCUMENT_NOT_FOUND.code;
const Todo = {
    schema: joi.object({
        id: joi.number().optional(),
        title: joi.string().required(),
        done: joi.boolean().optional()
    }).required(),
    forClient(item) {
        _.assign(item, {id: item._key});
        return _.omit(item, ["_key", "_id", "_rev", "_oldRev"]);
    }
};

module.context.use(router);

router.get("/all", function(req, res) {
    res.send(
    todos.all().toArray()
        .filter(item => !item.done )
        .map(item => _.assign(item, {id: item._key}))
        .map(item => _.omit(item, ["_key", "_id", "_rev", "_oldRev"]))
    );
});

router.get("/todo", function(req, res) {
    const item = todos.any();
    res.send(item);
})
.response(Todo);

router.post("/todo", function(req, res) {
    const todo = req.body;
    if (!todo.hasOwnProperty("done")) {
        _.assign(todo, {done: false});
    }
    const meta = todos.save(todo);
    res.send(_.assign(todo, meta));
})
.response(Todo)
.body(Todo);

router.patch("/todo/:id", function(req, res) {
    const data = req.body;
    const id = req.pathParams.id;
    try {
        const meta = todos.update(id, data);
        res.send(_.assign(data, meta));
    } catch (e) {
        if (!e.isArangoError || e.errorNum != DOC_NOT_FOUND) {
            throw (e);
        }
        res.throw(404, "The document does not exist.");
    }
})
.body(Todo)
.response(Todo);