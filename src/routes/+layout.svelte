<script lang="ts">
    import NavBar from "$lib/elements/NavBar.svelte";
    import "$lib/app.css";
</script>

<style>
    .placer {
        display: grid;
        grid-template-rows: 5rem 1fr;

        height: 100%;
    }
</style>

<div class="placer">
    <NavBar />
    <slot />
</div>
