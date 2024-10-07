<script lang="ts">
	import 'chartjs-adapter-moment';
	import { Line as LineChart } from "svelte-chartjs";
	import { Chart, TimeScale, LineElement, Title, Tooltip, Legend, PointElement, CategoryScale, LinearScale } from "chart.js";
	Chart.register(TimeScale, LineElement, Title, Tooltip, Legend, PointElement, CategoryScale, LinearScale);

	export let data;

	function generateKillsAndDeathsGraph() {
		return {
			labels: data.userStatHistory.map(item => new Date(item.scraped_at * 1000)),
			datasets: [
				{
					label: "Kills",
					data: data.userStatHistory.map(item => item.stats.total.kills_and_deaths.kills.total),
					borderColor: "#f00"
				},
				{
					label: "Deaths",
					data: data.userStatHistory.map(item => item.stats.total.kills_and_deaths.deaths.total),
					borderColor: "#00f"
				},
				{
					label: "Assists",
					data: data.userStatHistory.map(item => item.stats.total.kills_and_deaths.assists),
					borderColor: "#0ff"

				}
			]
		};
	}
	function generateMatchResultsGraph() {
		return {
			labels: data.userStatHistory.map(item => new Date(item.scraped_at * 1000)),
			datasets: [
				{
					label: "Wins",
					data: data.userStatHistory.map(item => item.stats.total.match_results.wins),
					borderColor: "#f00"
				},
				{
					label: "Losses",
					data: data.userStatHistory.map(item => item.stats.total.match_results.losses),
					borderColor: "#00f"
				},
				{
					label: "Draws",
					data: data.userStatHistory.map(item => item.stats.total.match_results.draws),
					borderColor: "#0ff"

				},
				{
					label: "Abandons",
					data: data.userStatHistory.map(item => item.stats.total.match_results.abandons),
					borderColor: "#f0f"

				}
			]
		};
	}
	function generateKdrGraph() {
		let items = [];

		let lastKills;
		let lastDeaths;
		for (let item of data.userStatHistory) {
			let currentKills = item.stats.total.kills_and_deaths.kills.total;
			let currentDeaths = item.stats.total.kills_and_deaths.deaths.total;
			if (lastKills === undefined || lastDeaths === undefined) {
				lastKills = currentKills;
				lastDeaths = currentDeaths;
				continue;
			}
			let diffKills = currentKills - lastKills;
			let diffDeaths = currentDeaths - lastDeaths;

			lastKills = currentKills;
			lastDeaths = currentDeaths;

			if (diffKills <= 0 || diffDeaths <= 0) {
				continue;
			}
			let localKdr = diffKills / diffDeaths;
			let globalKdr = currentKills / currentDeaths;
			items.push({
				scraped_at: new Date(item.scraped_at),
				localKdr,
				globalKdr
			});
		}
		return {
			labels: items.map(item => item.scraped_at),
			datasets: [
				{
					label: "Local KDR",
					data: items.map(item => item.localKdr),
					borderColor: "#f00"
				},
				{
					label: "Global KDR",
					data: items.map(item => item.globalKdr),
					borderColor: "#00f"
				}
			]
		};

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
	<section id="section-kills-and-deaths">
		<h2>Kills and Deaths</h2>
		<div class="chart">
			<LineChart data={generateKillsAndDeathsGraph()} options={{scales: {xAxis: {type: "time"}}}}/>
		</div>
	</section>
	<section id="section-match-results">
		<h2>Match results</h2>
		<div class="chart">
			<LineChart data={generateMatchResultsGraph()} options={{scales: {xAxis: {type: "time"}}}}/>
		</div>
	</section>
	<section id="section-kdr">
		<h2>KDR</h2>
		<div class="chart">
			<LineChart data={generateKdrGraph()} options={{scales: {xAxis: {type: "time"}}}}/>
		</div>
	</section>
	
</div>
