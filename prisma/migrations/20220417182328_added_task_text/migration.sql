/*
  Warnings:

  - Added the required column `text` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "todoID" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Task_todoID_fkey" FOREIGN KEY ("todoID") REFERENCES "Todo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("createdDate", "id", "todoID") SELECT "createdDate", "id", "todoID" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE INDEX "Task_id_idx" ON "Task"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
