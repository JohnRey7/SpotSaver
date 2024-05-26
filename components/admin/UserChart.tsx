"use client";
import { PureComponent } from "react";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const data = [
	{
		name: "Page A",
		likes: 500,
		favorites: 340,
		views: 20,
		amt: 240,
		date: new Date("2023-01-01"),
	},
	{
		name: "Page B",
		likes: 600,
		favorites: 740,
		views: 80,
		amt: 2210,
		date: new Date("2023-02-02"),
	},
	{
		name: "Page C",
		likes: 400,
		favorites: 240,
		views: 10,
		amt: 2290,
		date: new Date("2022-03-03"),
	},
	{
		name: "Page D",
		likes: 440,
		favorites: 340,
		views: 10,
		amt: 2290,
		date: new Date("2022-03-03"),
	},
];

export default class LChart extends PureComponent {
	render() {
		return (
			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					width={500}
					height={250}
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="likes" stroke="#8884d8" activeDot={{ r: 8 }} />
					<Line type="monotone" dataKey="favorites" stroke="#82ca9d" />
					<Line type="monotone" dataKey="views" stroke="#828888" />
				</LineChart>
			</ResponsiveContainer>
		);
	}
}
