import React from "react";
import Container from "../../components/ui/Container";
import { getTasks } from "@/actions/projects/get-tasks";
import { TasksDataTable } from "./components/data-table";
import { columns } from "./components/columns";

import { getTranslations } from "next-intl/server";
import { getBoards } from "@/actions/projects/get-boards";
import { getSession } from "@/lib/auth-server";
import NewTaskDialog from "../dialogs/NewTask";

const TasksPage = async () => {
  const tasks: any = await getTasks();
  const t = await getTranslations("ProjectsPage");
  const session = await getSession();
  const boards = session?.user?.id ? await getBoards(session.user.id) : [];

  return (
    <Container
      title={t("tasks.title")}
      description={t("tasks.description")}
    >
      <div className="py-5">
        <NewTaskDialog boards={boards} />
      </div>
      <div>
        <TasksDataTable data={tasks} columns={columns} />
      </div>
    </Container>
  );
};

export default TasksPage;
