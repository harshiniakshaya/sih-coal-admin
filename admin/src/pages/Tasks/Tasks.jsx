import { useState, useEffect } from "react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AddTask from "@/components/custom/Dialog/AddTask";
import { Button } from "@/components/ui/button";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tasks");
        const data = response.data;
        setTasks(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching tasks data:", error.message);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="mt-16 ml-16">
      <AddTask />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Is Done</TableHead>
            <TableHead>Allotted Time</TableHead>
            <TableHead>Completed Time</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.id}</TableCell>
              <TableCell>{task.task}</TableCell>
              <TableCell>{task.isdone ? "Yes" : "No"}</TableCell>
              <TableCell>
                {task.allottedtime
                  ? new Date(task.allottedtime).toLocaleString()
                  : ""}
              </TableCell>
              <TableCell>
                {task.completedtime
                  ? <Button className="bg-green-700 w-[170px] text-wrap">{new Date(task.completedtime).toLocaleString()} Task Completed</Button>
                  : <Button className="bg-yellow-500 w-[170px] hover:bg-yellow-400">
                    In Progress
                  </Button>}
              </TableCell>

              <TableCell>{task.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Tasks;
