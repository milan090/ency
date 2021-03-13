/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
const util = require("util");
const NodeEnvironment = require("jest-environment-node");
const { nanoid } = require("nanoid");
const { Client } = require("pg");
const exec = util.promisify(require("child_process").exec);
const { seed } = require("./seed.js");

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    // Generate a unique sqlite identifier for this test context
    this.schemaName = `test_${nanoid()}`;
    process.env.DATABASE_URL = `postgresql://postgres:postgres@localhost:5432/postgres?schema=${this.schemaName}`;
    this.global.process.env.DATABASE_URL = `postgresql://postgres:postgres@localhost:5432/postgres?schema=${this.schemaName}`;
    this.dbUrl = `postgresql://postgres:postgres@localhost:5432/postgres?schema=${this.schemaName}`;
  }

  async setup() {
    // Run the migrations to ensure our schema has the required structure
    await exec("yarn prisma db push --preview-feature");
    super.setup();
    await seed();
  }

  async teardown() {
    try {
      // Drop the schema after the tests have completed
      const client = new Client({
        connectionString: this.dbUrl,
      });
      await client.connect();
      await client.query(`DROP SCHEMA IF EXISTS "${this.schemaName}" CASCADE`);
      await client.end();
      // Release the Prisma Client connection
    } catch (error) {
      // doesn't matter as the environment is torn down
      console.log(error);
      process.exit(0);
    }
  }
}

module.exports = PrismaTestEnvironment;
