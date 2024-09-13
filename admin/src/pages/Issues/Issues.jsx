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

const Issues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/issues");
        const data = response.data;
        setIssues(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching events data:", error.message);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ml-16 mt-16 text-black">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Equipment Name</TableHead>
            <TableHead>Issue Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Urgency Level</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium">{issue.id}</TableCell>
              <TableCell>{issue.equipmentname}</TableCell>
              <TableCell>{issue.issuetype}</TableCell>
              <TableCell>{issue.location}</TableCell>
              <TableCell>{issue.urgencylevel}</TableCell>
              <TableCell>
                {new Date(issue.timestamp).toLocaleString()}
              </TableCell>
              <TableCell>{issue.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Issues;
