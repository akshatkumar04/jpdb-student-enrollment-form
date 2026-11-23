# Student Enrollment Form

## Table of Contents
- [Description](#description)
- [Benefits of using JsonPowerDB](#benefits-of-using-jsonpowerdb)
- [Scope of Functionalities](#scope-of-functionalities)
- [Illustrations](#illustrations)
- [Examples of Use](#examples-of-use)
- [How to Run](#how-to-run)
- [Project Status](#project-status)
- [Release History](#release-history)
- [Sources](#sources)
- [Author](#author)

## Description
A single-page Student Enrollment Form built with plain HTML, Bootstrap 5 and jQuery. It stores student records in a JsonPowerDB (JPDB) database (`SCHOOL-DB`, relation `STUDENT-TABLE`), keyed on `rollNo`. Entering a roll number looks the student up: new students can be saved, existing ones can be edited and updated.

## Benefits of using JsonPowerDB
1. Schema-free: store JSON documents directly without defining tables or columns up front.
2. Simple REST API: every operation is one HTTP call, so no backend server is needed.
3. High performance with built-in indexing, including fast lookup by primary key.
4. Lightweight JavaScript helper library (`jpdb-commons.js`) wraps the request building.
5. Works with plain front-end code, with no ORM, drivers or build tooling.
6. Fast to prototype and easy to scale from a small form to a larger application.

## Scope of Functionalities
- Look up a student by Roll No (primary key).
- Save a new student record (PUT).
- Update an existing record using its `rec_no` (UPDATE).
- Reset the form to its initial state.
- Validation: Save and Update are blocked if any field is empty.
- Button and field enable/disable states guide the user through the workflow.

## Illustrations
- New student: [screenshots/form-new.png](screenshots/form-new.png)
- Existing student: [screenshots/form-existing.png](screenshots/form-existing.png)

## Examples of Use
Sample record:

```json
{
  "rollNo": "101",
  "fullName": "Asha Patil",
  "stdClass": "10",
  "birthDate": "2010-05-14",
  "address": "Mumbai",
  "enrollmentDate": "2026-06-01"
}
```

Sample PUT request:

```json
{
  "token": "YOUR_TOKEN_HERE",
  "dbName": "SCHOOL-DB",
  "cmd": "PUT",
  "rel": "STUDENT-TABLE",
  "jsonStr": { "rollNo": "101", "fullName": "Asha Patil", "stdClass": "10", "birthDate": "2010-05-14", "address": "Mumbai", "enrollmentDate": "2026-06-01" }
}
```

## How to Run
1. Clone the repository.
2. Copy `public_html/js/config.example.js` to `public_html/js/config.js` and replace `YOUR_TOKEN_HERE` with your JPDB connection token.
3. Serve the site: `npx http-server public_html -p 8080`
4. Open http://localhost:8080 (or open the project in NetBeans as an HTML5 project).

## Project Status
Version 1.0.0 is complete and working.

## Release History
- **v1.0.0** – initial release.

## Sources
- JsonPowerDB: http://login2explore.com
- Bootstrap 5: https://getbootstrap.com
- jQuery: https://jquery.com

## Author
Akshat kumar, KJSSE
