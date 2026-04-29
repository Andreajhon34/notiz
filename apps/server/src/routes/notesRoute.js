import { Router } from "express";
import { authentication } from "../middleware/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import { query } from "../lib/db.js";
import { ResourceNotFoundError } from "../lib/appError.js";

const notes = Router();

notes.get(
  "/notes",
  authentication,
  asyncHandler(async (req, res) => {
    const user_id = req.user.id;

    const noteResult = await query(
      `SELECT id, title, content, created_at, updated_at
   FROM notes
   WHERE user_id = $1 ORDER BY updated_at DESC`,
      [user_id],
    );

    return res.success({
      statusCode: 200,
      code: "FETCHED_SUCCESSFULLY",
      message: "Notes retrieved successfully",
      data: noteResult.rows,
    });
  }),
);

notes.get(
  "/notes/:id",
  authentication,
  asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const note_id = req.params.id;

    const noteResult = await query(
      `SELECT id, title, content, created_at, updated_at
   FROM notes
   WHERE user_id = $1 AND id = $2`,
      [user_id, note_id],
    );

    if (noteResult.rows.length === 0) {
      throw new ResourceNotFoundError("Note could not be found");
    }

    return res.success({
      statusCode: 200,
      code: "FETCHED_SUCCESSFULLY",
      message: "Notes retrieved successfully",
      data: noteResult.rows[0],
    });
  }),
);

notes.post(
  "/notes",
  authentication,
  asyncHandler(async (req, res) => {
    const user_id = req.user.id;

    const { title, content } = req.body;

    const noteResult = await query(
      `INSERT INTO notes (title, content, user_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, content, user_id],
    );

    return res.success({
      statusCode: 201,
      code: "CREATED_SUCCESSFULLY",
      message: "Note created successfully",
      data: noteResult.rows[0],
    });
  }),
);

notes.put(
  "/notes/:id",
  authentication,
  asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const note_id = req.params.id;
    const { title, content } = req.body;

    const noteResult = await query(
      `UPDATE notes
       SET title = $1, content = $2, updated_at = NOW()
       WHERE id = $3 AND user_id = $4
       RETURNING id, title, content, created_at, updated_at`,
      [title, content, note_id, user_id],
    );

    if (noteResult.rows.length === 0) {
      throw new ResourceNotFoundError();
    }

    return res.success({
      statusCode: 200,
      code: "UPDATED_SUCCESSFULLY",
      message: "Note updated successfully",
      data: noteResult.rows[0],
    });
  }),
);

notes.delete(
  "/notes/:id",
  authentication,
  asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const note_id = req.params.id;

    const noteResult = await query(
      `
  DELETE FROM notes
  WHERE id = $1 AND user_id = $2
  RETURNING id
  `,
      [note_id, user_id],
    );

    if (noteResult.rows.length === 0) {
      throw new ResourceNotFoundError("Note not found or already deleted");
    }

    return res.success({
      statusCode: 200,
      code: "DELETED_SUCCESSFULY",
      message: "Note deleted successfully",
      data: noteResult.rows[0],
    });
  }),
);

export default notes;
