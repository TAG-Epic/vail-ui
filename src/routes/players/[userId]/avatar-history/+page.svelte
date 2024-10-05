<script lang="ts">
	export let data;
</script>

<style>
	h1, table {
		color: #ccc;
	}
</style>

<div>
	<h1>Avatar history</h1>
	<table>
		<tr>
			<th>Avatar</th>
			<th>Discovered at</th>
		</tr>
		{#await data.avatarHistory then history}
			{#each history as entry}
				<tr>
					<td><img src={entry.avatar_url} alt=""></td>
					<td>{new Date(entry.discovered_at).toLocaleString()}</td>
				</tr>
			{/each}
		{/await}
	</table>
</div>
