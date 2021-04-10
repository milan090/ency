/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userData = require("./mock-data.json").users;

module.exports.userData = userData;

module.exports.seed = async function seed() {
  await prisma.user.create({
    data: userData[0],
  });
  await prisma.$disconnect();
};
