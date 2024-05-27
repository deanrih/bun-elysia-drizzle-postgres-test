import Elysia from "elysia";
import { database } from "~/db/main";
import { user } from "~/db/schema";
import { faker } from "@faker-js/faker";

export const app = new Elysia({ prefix: "/user" })
  .get(
    "/add-random-user",
    async () => {
      return database.insert(user).values({
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        acitve: true,
        isApproved: true,
        deleted: false,
        sex: "male",
        dob: faker.date.past(),
        approvedAt: faker.date.past(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      });
    },
    {
      detail: {
        description: "Add random user",
        tags: ["User"],
      },
    }
  )
  .get(
    "/all",
    async () => {
      return database.query.user.findMany();
    },
    {
      detail: {
        description: "Get all users",
        tags: ["User"],
      },
    }
  );
