# End-to-end type-safe Todo App on Cloudflare

This Todo App is a project demonstrating the creation of an end-to-end type-safe web application quickly and cost-effectively by combining tRPC, Cloudflare Pages, Cloudflare Pages Functions, and Cloudflare D1. This repository contains the source code for the application, as well as instructions on how to set up and deploy it.

# Key Features

- Host static content on Cloudflare Pages
- Implement serverless functions for API endpoints using Cloudflare Pages Functions
- Utilize tRPC for type-safe communication between backend and frontend
- Use Cloudflare D1 as a lightweight, SQLite-based database solution

# Prerequisites

- Node.js (v18 or higher)
- Cloudflare account

# Getting Started

1. Create a repository from this template repository using the GitHub CLI

    ```bash
    gh repo create yapc-kyoto-2023-demo --clone --public --template toyamarinyon/trpc-d1-todo
    cd yapc-kyoto-2023-demo
    ```

1. Instal dependencies

    ```bash
    npm install
    ```

    > **Note** I prefer pnpm over npm but Cloudflare Pages builds do not yet support pnpm.

1. Create your database

    Run the following command and give your database a name:
    ```bash
    npx wrangler d1 create <DATABASE_NAME>
    ```

1. Configure database binding with wrangler.toml

    You need to configure database binding to run it and test it locally with wrangler.toml

    Add the following to your wrangler.toml file:
    ```toml
    [[ d1_databases ]]
    binding = "<BINDING_NAME>"
    database_name = "<DATABASE_NAME>"
    database_id = "<UUID>"
    ```

    Set your binding name by updating the <BINDING_NAME> value. Your binding is available in your Cloudflare Pages Functions at env.<BINDING_NAME>. You will find the values for database_name and database_id in your terminal after you run the create command in step 3.

1. Run a query against your local database

    You can create our database with [schema.sql](./schema.sql):
    ```sql
    # schema.sql
    DROP TABLE IF EXISTS tasks;

    CREATE TABLE tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      completion_datetime DATETIME
    );
    ```
    Let's create database by running:
    ```bash
    npx wrangler d1 execute <DATABASE_NAME> --local --file=./schema.sql
    ```
    Then validate your data is in your database by running:
    ```bash
    npx wrangler d1 execute <DATABASE_NAME> --local --command='SELECT * FROM tasks'
    ```
1. Run locally with Wrangler

    While in your project directory, test your database locally by running:

    ```bash
    npx wrangler pages dev --local --persist --d1=<DATABASE_NAME> -- npm run dev
    ```

    When you run `wrangler pages dev -- npm run dev`, Wrangler will let you run your Pages application locally, which includes pass through `npm run dev` to run vite development server and running your Functions.

    will give you a URL (most likely localhost:8787) to review your Worker.

# Deploying to Cloudflare Pages and Cloudflare Pages Functions

1. Log in to the Cloudflare dashboard.
1. Select your account in **Account Home** > **Pages**.
1. Select **Create a project** > **Connect to Git**.
1. Select your new GitHub repository.
1. In the **Set up builds and deployments**, set `npm run build` as the **Build command**, and `dist` as the **Build output directory**.
1. Select **Environment variables (advanced)** > **+ Add variable** > configure a `NODE_VERSION` variable with `17`.
1. The deployment will succeed, but database binding is not yet, so setting it is.

    1. Show **Settings** tab.
    1. Select **Functions** menu.
    1. Select **D1 database bindings** > **Add binding** > configure a `DB` variable with a value of `<DATABASE_NAME>`

1. Redeploy the latest deployment to apply the above settings.
1. Run a query against your D1 database

    You've run a query againt your local database on `Getting Started` setion. Let's run the same query against your D1 database:
    ```bash
    npx wrangler d1 execute <DATABASE_NAME> --file=./schema.sql
    ```
