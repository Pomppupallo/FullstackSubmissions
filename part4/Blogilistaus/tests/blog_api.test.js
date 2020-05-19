const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));

  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("Get functions", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const title = response.body.map((r) => r.title);
    expect(title).toContain("React patterns");
  });

  test("blog wihtout likes value -> value is set to 0", async () => {
    const response = await api.get("/api/blogs");

    const likes = response.body.map((blog) => blog.likes);

    for (let i = 0; i < likes.length; i++) {
      if (likes[i] == undefined) {
        expect(likes[i]).toBe(0);
      }
    }
  });

  test("blog is identified with id", async () => {
    const response = await api.get("/api/blogs");

    const ids = response.body.map((blog) => blog.id);
    expect(ids).toBeDefined();
  });
});

describe("Post & delete functions", () => {
  test("a valid blog can be added", async () => {
    // Create user and log in for token
    const newUser = {
      username: "toniv",
      name: "Toni Virtanen",
      password: "12345",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const tokenUser = await api
      .post("/api/login")
      .send({
        username: "toniv",
        password: "12345",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const decodedToken = jwt.verify(tokenUser.body.token, config.SECRET);

    // Create new blog post
    const newBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      user: decodedToken.id,
    };

    await api
      .post("/api/blogs/")
      .set({
        Authorization: `bearer ${tokenUser.body.token}`,
        Accept: "application/json",
      })
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const notesAtEnd = await helper.blogsInDb();
    expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = notesAtEnd.map((b) => b.title);
    expect(titles).toContain("Go To Statement Considered Harmful");
  });

  test("posting blog without title and url returns status 400", async () => {
    // Create user and log in for token
    const newUser = {
      username: "toniv",
      name: "Toni Virtanen",
      password: "12345",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const tokenUser = await api
      .post("/api/login")
      .send({
        username: "toniv",
        password: "12345",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const decodedToken = jwt.verify(tokenUser.body.token, config.SECRET);

    const newBlog = {
      author: "Edsger W. Dijkstra",
      likes: 5,
      user: decodedToken.id,
    };
    await api
      .post("/api/blogs")
      .set({
        Authorization: `bearer ${tokenUser.body.token}`,
        Accept: "application/json",
      })
      .send(newBlog)
      .expect(400);
  });

  test("removing one blog", async () => {
    const newUser = {
      username: "toniv",
      name: "Toni Virtanen",
      password: "12345",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const tokenUser = await api
      .post("/api/login")
      .send({
        username: "toniv",
        password: "12345",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const decodedToken = jwt.verify(tokenUser.body.token, config.SECRET);

    const newBlog = {
      author: "Edsger W. Dijkstra",
      title: "To be deleted",
      url: "netti.fi",
      likes: 5,
      user: decodedToken.id,
    };

    const blogToDelete = await Blog.insertMany(newBlog);
    const toRemove = blogToDelete[0]._id;

    await api
      .delete(`/api/blogs/${toRemove}`)
      .set({
        Authorization: `bearer ${tokenUser.body.token}`,
        Accept: "application/json",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const notesAtEnd = await helper.blogsInDb();
    expect(notesAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("creation of a user", () => {
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "toniv",
      name: "Toni Virtanen",
      password: "123456",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    await api.post("/api/users").send(newUser);

    const usersAtStart = await helper.usersInDb();

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
