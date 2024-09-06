<script lang="ts">
    export let background: string;
    export let darkBackground: boolean;
    export let title: string;
    export let description: string;
</script>
<div class="card" style="background: {background};">
    <h1>{title}</h1>
    <div class="description-container">
        <p data-dark={!darkBackground}>{description}</p>
    </div>
</div>

<style>
    .card {
        height: 100%;
        scroll-snap-align: start;
    }
    h1 {
        text-align: center;
        font-size: 5rem;
        margin: 0;
    }
    .description-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    p {
        white-space: pre;
        font-weight: 100;
        font-family: "Roboto";
        text-wrap: wrap;
        padding: .5rem;
    }
    p[data-dark="false"] {
        color: #fff;
    }
</style>
