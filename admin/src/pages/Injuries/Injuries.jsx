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

const Injuries = () => {
  const [injuries, setInjuries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/injuries");
        const data = response.data;
        setInjuries(data);
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
            <TableHead>Injury Type</TableHead>
            <TableHead>Injured Person</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {injuries.map((injury) => (
            <TableRow key={injury.id}>
              <TableCell className="font-medium">{injury.id}</TableCell>
              <TableCell>{injury.injurytype}</TableCell>
              <TableCell>{injury.injuredperson}</TableCell>
              <TableCell>{injury.location}</TableCell>
              <TableCell>{injury.severity}</TableCell>
              <TableCell>{new Date(injury.timestamp).toLocaleString()}</TableCell>
              <TableCell>{injury.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Injuries;
