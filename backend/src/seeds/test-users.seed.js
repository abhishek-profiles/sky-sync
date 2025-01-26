import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

config();

const testUsers = [
  {
    email: "test.user1@example.com",
    fullName: "Test User 1",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    email: "test.user2@example.com",
    fullName: "Test User 2",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    email: "test.user3@example.com",
    fullName: "Test User 3",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/12.jpg",
  }
];

const seedTestUsers = async () => {
  try {
    await connectDB();

    // Hash passwords before saving
    const hashedUsers = await Promise.all(
      testUsers.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      })
    );

    await User.insertMany(hashedUsers);
    console.log("Test users seeded successfully");
    console.log("\nTest User Credentials:");
    testUsers.forEach((user) => {
      console.log(`\nEmail: ${user.email}\nPassword: ${user.password}`);
    });
  } catch (error) {
    console.error("Error seeding test users:", error);
  } finally {
    process.exit(0);
  }
};

seedTestUsers();