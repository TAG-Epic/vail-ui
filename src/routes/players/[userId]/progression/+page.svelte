<script lang="ts">
	import 'chartjs-adapter-moment';
	import { Line as LineChart } from "svelte-chartjs";
	import { Chart, TimeScale, LineElement, Title, Tooltip, Legend, PointElement, CategoryScale, LinearScale } from "chart.js";
	import { LEVEL_PROGRESSION } from "$lib/data/xp_progression";
	Chart.register(TimeScale, LineElement, Title, Tooltip, Legend, PointElement, CategoryScale, LinearScale);

	export let data;

	function generateXpGraph() {
		return {
			labels: data.userStatHistory.map(item => new Date(item.scraped_at * 1000)),
			datasets: [
				{
					label: "XP",
					data: data.userStatHistory.map(item => item.stats.progression.xp),
					borderColor: "#f00"
				},
				{
					label: "Your XP if you optimally prestiged",
					data: data.userStatHistory.map(item => item.stats.progression.score % LEVEL_PROGRESSION[LEVEL_PROGRESSION.length - 1]),
					borderColor: "#00f"

				}
			]
		};
	}
	function generateScoreGraph() {
		return {
			labels: data.userStatHistory.map(item => new Date(item.scraped_at * 1000)),
			datasets: [
				{
					label: "Score",
					data: data.userStatHistory.map(item => item.stats.progression.score),
					borderColor: "#f00"
				}
			]
		}

	}
	function getXpTick(value: number) {
		let level = 0;

		for (let requiredXp of LEVEL_PROGRESSION.slice(1)) {
			if (value < requiredXp) {
				return `Level ${level}`;
			}
			level += 1
		}
		return `Level ${level}`;
	}
</script>
<style>
	h1, h2 {
		color: #ccc;
	}
	.chart {
		background: #fff;
	}
</style>
<div>
	<h1>Graphs</h1>
	<section id="section-xp">
		<h2>XP</h2>
		<div class="chart">
			<LineChart data={generateXpGraph()} options={{scales: {xAxis: {type: "time"}, y: {ticks: {callback: getXpTick}}}}}/>
		</div>
		<h2>Score (total xp)</h2>
		<div class="chart">
			<LineChart data={generateScoreGraph()} options={{scales: {xAxis: {type: "time"}, y: {ticks: {callback: getXpTick}}}}}/>
		</div>
	</section>
	
</div>
