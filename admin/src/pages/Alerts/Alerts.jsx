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
import { Button } from "@/components/ui/button";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/alerts");
        const data = response.data;
        setAlerts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching operators data:", error.message);
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
            <TableHead>Alert Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Resolved</TableHead>
            <TableHead>Urgency Level</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.map((alert) => (
            <TableRow key={alert.id}>
              <TableCell className="font-medium">{alert.id}</TableCell>
              <TableCell>{alert.alerttype}</TableCell>
              <TableCell>{alert.location}</TableCell>
              <TableCell>{alert.description}</TableCell>
              <TableCell>{alert.isresolved ? "Yes" : "No"}</TableCell>
              <TableCell> 
              <Button className={`${
    alert.urgencylevel > 7
      ? "bg-red-600 text-white w-16 hover:bg-red-600"
      : "bg-green-600 text-white w-16 hover:bg-green-600"
  }`}>
              {alert.urgencylevel}
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Alerts;
