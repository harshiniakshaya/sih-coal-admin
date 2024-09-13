// import { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto';

// const TaskChart = () => {
//     const [tasks, setTasks] = useState([]);
//     useEffect(()=>{
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3001/tasks');
//                 const data = response.data;
//                 setTasks(data);
//                 console.log(data);
//             } catch (error) {
//                 console.error('Error fetching tasks data:', error.message);
//             }
//         };
//         fetchData();
//         const interval = setInterval(fetchData, 2000); 
//         return () => clearInterval(interval);
//     },[])

//     const labels = tasks.map(task => task.task);
//     const completedData = tasks.map(task => task.isdone === "t" ? 1 : 0);
//     const inProgressData = tasks.map(task => task.isdone === "f" ? 1 : 0);

//     const cumulativeCompleted = completedData.map((val, i) =>
//         completedData.slice(0, i + 1).reduce((acc, curr) => acc + curr, 0)
//     );
//     const cumulativeInProgress = inProgressData.map((val, i) =>
//         inProgressData.slice(0, i + 1).reduce((acc, curr) => acc + curr, 0)
//     );

//     const data = {
//         labels: labels,
//         datasets: [
//             {
//                 label: 'Completed Tasks',
//                 data: cumulativeCompleted,
//                 borderColor: '#4CAF50',
//                 fill: false,
//             },
//             {
//                 label: 'In Progress Tasks',
//                 data: cumulativeInProgress,
//                 borderColor: '#FF9800',
//                 fill: false,
//             },
//         ],
//     };
//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Task Status Over Time',
//             },
//         },
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Tasks',
//                 },
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: 'Number of Tasks',
//                 },
//                 beginAtZero: true,
//             },
//         },
//     };
//     return <Line data={data} options={options} />;
// }

// export default TaskChart