import express, { urlencoded } from "express";
import colors from "colors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// dotenv configuration
dotenv.config();

// environment variables
const PORT = process.env.PORT || 3000;

// initialize express
const app = express();

// initialize prisma
const prisma = new PrismaClient();

// middleware to parse JSON request bodies
app.use(express.json());
app.use(urlencoded({ extended: false }));

// controllers

// user

// get all users
app.get("/user/", async (req, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
});

// create a user
app.post("/user/", async (req, res) => {
  const data = req.body;

  const user = await prisma.user.create({ data });

  res.status(200).json(user);
});

// delete a user
app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;

  const deleteAUser = await prisma.user.delete({ where: { id: Number(id) } });

  res.status(200).json(deleteAUser);
});

// update a user
app.patch("/user/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const updateAUser = await prisma.user.update({
    where: { id: Number(id) },
    data,
  });

  res.status(200).json(updateAUser);
});

// student

// get all student
app.get("/student", async (req, res) => {
  // student er kace kon book ace tar details janar jonno include
  const students = await prisma.student.findMany({
    include: {
      books: true,
    },
  });

  res.status(200).json(students);
});

// create a student
app.post("/student", async (req, res) => {
  const data = req.body;

  const student = await prisma.student.create({ data });

  res.status(200).json(student);
});

// delete a student
app.delete("/student/:id", async (req, res) => {
  const { id } = req.params;

  const deleteAStudent = await prisma.student.delete({
    where: { id: Number(id) },
  });

  res.status(200).json(deleteAStudent);
});

// books

// get all book
app.get("/book", async (req, res) => {
  // k book kince tar details janar jonno include
  const books = await prisma.books.findMany({
    include: {
      student: true,
    },
  });

  res.status(200).json(books);
});

// create a book
app.post("/book", async (req, res) => {
  const data = req.body;

  const book = await prisma.books.create({ data });

  res.status(200).json(book);
});

// delete a book
app.delete("/book/:id", async (req, res) => {
  const { id } = req.params;

  const deleteABook = await prisma.books.delete({ where: { id: Number(id) } });

  res.status(200).json(deleteABook);
});

// server listening on port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgGreen.black.bold);
});
