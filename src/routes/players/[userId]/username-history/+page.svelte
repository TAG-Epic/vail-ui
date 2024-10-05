<script lang="ts">
	export let data;
</script>

<style>
	h1, table {
		color: #ccc;
	}
</style>

<div>
	{#await data.usernameHistory}
		<h1>Username history</h1>
	{:then history}
		<h1>Username history for {history[history.length - 1].display_name}</h1>
	{/await}
	<table>
		<tr>
			<th>Username</th>
			<th>Discovered at</th>
		</tr>
		{#await data.usernameHistory then history}
			{#each history as entry}
				<tr>
					<td>{entry.display_name}</td>
					<td>{new Date(entry.discovered_at).toLocaleString()}</td>
				</tr>
			{/each}
		{/await}
	</table>
</div>
