# Task Tracker CLI

Simple Command Line Interface (CLI) Application to manage tasks. It allows us to add, update, delete, mark and list tasks directly from terminal in JSON file.

## Features

- **Add Task:**- Add new tasks with ID and store it in `JSON` format.
- **Update Task:**- Update the description of an existing task With ID.
- **List Tasks:**- List All Tasks in JSON file
- **List Task By status:**- List All Tasks By status
- **Mark Task By status:**-Mark Task By status as 'todo' or 'in-progress' or 'done'
- **Show All commands:**-Show all available commands

## Prerequisites

- Node.js installed on your system.

## Installation

**Clone the Repository**

```bash
git clone https://github.com/thweookhine/Task-Tracker-CLI.git

# Navigate to the project Directory
cd Task-Tracker-CLI
```

## Usage

- **Show All Commands**

```bash
# Showing All Commands
node index.js help
#OR
node index.js -h
#OR
node index.js --help
```

- **Add a Task**

```bash
# Adding a new task
node index.js add "Task1"
#OR
node index.js -a "Task1"
#OR
node index.js --add "Task1"
```

- **Update a Task**

```bash
node index.js update 1 "Updated Task1"
#OR
node index.js -u 1 "Updated Task1"
#OR
node index.js --update 1 "Updated Task1"
```

- **List all Tasks**

```bash
node index.js list
#OR
node index.js -l
#OR
node index.js --list
```

- **List the tasks by status**

```bash
# To list the tasks that are marked as to-do
node index.js list todo

# To list the tasks that are marked as in-progess
node index.js list in-progress

# To list the tasks that are marked as done
node index.js list done
```

- **Mark Task Status**

```bash
# Mark as `todo` with containing task ID as 1
node index.js mark-todo 1

# Mark as `in-progress` with containing task ID as 1
node index.js mark-in-progress 1

# Mark as `done` with containing task ID as 1
node index.js mark-done 1
```

- **Delete a Task**

```bash
# Delete the task by containing its ID 1
node index.js delete 1
```

For More information about this project, visit the [Task Tracker Project Roadmap](https://roadmap.sh/projects/task-tracker).# github-task-tracker-cl
