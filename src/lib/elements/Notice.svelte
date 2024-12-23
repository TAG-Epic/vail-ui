<script lang="ts">
	import { SEEN_NOTICE } from "$lib/stores";
	import { onMount } from "svelte";
	// Binds
	let dialog: HTMLDialogElement;
	
	onMount(() => {
		if (!$SEEN_NOTICE) {
			dialog.showModal();
			$SEEN_NOTICE = true;
		}
	});
</script>
<dialog bind:this={dialog}>
	<h1>NOTICE</h1>
	<p>
		This site will no longer receive any feature updates nor performance improvements.
		This is due to AEXLAB ignoring it's community (<i>cough cough competitive, cough cough wassies</i>) and making maintaining this site increasingly and excessively difficult.
	</p>
	<p>
		Fun fact: this site currently works by faking a VAIL player and bypassing the hardware ban system (we are not hardware banned). Thanks AEXLAB.
		We used to do simpler ways previously however AEXLAB blocked us from using these.
	</p>

	<form method="dialog">
		<button type="submit">Hide</button>
	</form>
</dialog>
