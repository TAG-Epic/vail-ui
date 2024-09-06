<script lang="ts">
	import Card from "$lib/elements/Card.svelte";
    import { browser } from "$app/environment";
    export let data;
    import { getUserInfo, getUserStats, getUserRankings } from "$lib/api";
    import type { UserStats, UserInfo } from "$lib/api/types";

    type CardProps = {
        background: string;
        darkBackground: boolean;
        title: string;
        description: string;
    };

    function formatTime(totalSeconds: number) {
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        let components = [];

        if (hours > 0) {
            components.push(`${hours} hours`);
        }
        if (minutes > 0) {
            components.push(`${minutes} minutes`);
        }
        components.push(`${seconds} seconds`);
        return components.join(", ");

    }


    async function generateCards(): Promise<CardProps[]> {
        let getUserInfoPromise = getUserInfo(data.userId);
        let getUserStatsPromise = getUserStats(data.userId);
        let getUserRankingsPromise = getUserRankings(data.userId);

        await Promise.allSettled([getUserInfoPromise, getUserStatsPromise, getUserRankingsPromise]);
        
        let userInfo = await getUserInfoPromise;
        let userStats = await getUserStatsPromise;
        let userRankings = await getUserRankingsPromise;

        let wipCards: CardProps[] = [];

        // TODO: Past usernames/avatars
        // TODO: Rankings
        
        wipCards.push(generateOptimalPrestigeCard(userStats));
        wipCards.push(generatePlatformCard(userInfo));
        wipCards.push(generateHeadshotGunCard(userStats));
        wipCards.push(generatePlaytimeCard(userStats));
        wipCards.push(generateKillsPerHourCard(userStats));
        wipCards.push(generateLegHitsCard(userStats));

        return wipCards 
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)

    }

    function generateOptimalPrestigeCard(userStats: UserStats): CardProps {
        let level50XpRequirement = 669625;
        let maxOptimalPrestige = Math.floor(userStats.progression.score / level50XpRequirement);
        return {
            background: "#72A1E5",
            darkBackground: false,
            title: "⬆️",
            description: `If there was no prestige limit, you could have prestiged ${maxOptimalPrestige} times`
        };
    }
    function generatePlatformCard(userInfo: UserInfo): CardProps {
        // TODO: this detection sucks! should check platforms instead
        if (userInfo.avatar_url.includes("https://avatars.steamstatic.com")) {
            return {
                background: "#1b2839",
                darkBackground: true,
                title: "😤",
                description: "Well hello there fellow steam user. Rare to see a fellow steam user in the wild nowadays."
            };
        } else if (userInfo.avatar_url.includes("https://scontent.oculuscdn.com")) {
            return {
                background: "#0064e0",
                darkBackground: false,
                title: "🧭",
                description: "Imagine being locked into meta's ecosystem. smh"
            };
        } else {
            return {
                background: "#f00",
                darkBackground: false,
                title: "😐",
                description: "Why are you cheating 😐\nOr more accurately: how do you have a profile picture from neither steam nor oculus"
            }
        }

    }
    function generateHeadshotGunCard(userStats: UserStats): CardProps {
        let allGuns = [
            ...(Object.entries(userStats.weapons.primary).map((data) => {return {name: data[0], gun: data[1]}})),
            ...(Object.entries(userStats.weapons.secondary).map((data) => {return {name: data[0], gun: data[1]}})),
        ];

        let sortedGunsByHeadshotKillAccuracy = allGuns.sort((gunOne, gunTwo) => {
            let gunOneHsRatio = gunOne.gun.kills.headshots / gunOne.gun.kills.total;
            let gunTwoHsRatio = gunTwo.gun.kills.headshots / gunTwo.gun.kills.total;

            return gunOneHsRatio > gunTwoHsRatio;
        });
        let bestHeadshotGun = sortedGunsByHeadshotKillAccuracy[0];
        let emoji = "🏌️"
        // For headshotters show 🎯
        let headshotRatio = bestHeadshotGun.gun.kills.headshots / bestHeadshotGun.gun.kills.total;
        if (headshotRatio > .5) {
            emoji = "🎯";
        }

        return {
            background: "#87BBA2",
            darkBackground: false,
            title: emoji,
            description: `You have the best headshot ratio on ${bestHeadshotGun.name} with a ${Math.floor(headshotRatio*100)}% headshot kill chance`
        };
    }
    function generatePlaytimeCard(userStats: UserStats): CardProps {
        let timePlayedSeconds = userStats.total.time_played_seconds;
        let hoursPlayed = timePlayedSeconds / 60 / 60;

        let minimumWage = 7.25;
        return {
            background: "#CEC075",
            darkBackground: false,
            title: "⏲️",
            description: `You have spent ${timePlayedSeconds} seconds inside vail pubs. In human terms: ${formatTime(timePlayedSeconds)}. \n\nIf you would have spent that time working a US federal minimum wage job, you would have earned ${Math.floor(hoursPlayed * minimumWage)}$ before taxes\n\nYikes.`
        };
    }

    function generateKillsPerHourCard(userStats: UserStats): CardProps {
        let killsPerHour =  userStats.total.kills_and_deaths.kills.total / (userStats.total.time_played_seconds / 60 / 60);
        
        let gamemodeToKillsPerHour = Object.entries(userStats.gamemodes).map((params) => {
            let [name, data] = params;
            return {name, kills_per_hour: data.kills_and_deaths.kills / (data.time_played_seconds / 60 / 60)}
        }).sort((a, b) => a.kills_per_hour < b.kills_per_hour);

        let bestGamemode = gamemodeToKillsPerHour[0];

        return {
            background: "#9883E5",
            darkBackground: false,
            title: "🩸",
            description: `You average ${Math.floor(killsPerHour)} kills/hour.\nYour best gamemode is ${bestGamemode.name.replace("_", " ")} with an average of ${Math.floor(bestGamemode.kills_per_hour)} kills/hour`
        };
    }
    function generateLegHitsCard(userStats: UserStats) {
        let timesHitLeg = 0;
        for (let gunStats of Object.values(userStats.weapons.primary)) {
            timesHitLeg += gunStats.shots.hits.leg;
        }
        for (let gunStats of Object.values(userStats.weapons.secondary)) {
            timesHitLeg += gunStats.shots.hits.leg;
        }

        return {
            background: "#1EFFBC",
            darkBackground: false,
            title: "🦵",
            description: `Not a headshot deamon, nor a bodyshot bandit but a ✨ leg loser ✨? Anyways, you have hit someones leg ${timesHitLeg} times`
        }
    }
</script>

<div class="cards-container">
    <Card title="👀" description={"Lets take a look at your stats, shall we?\n(swipe down)"} background="#0FF" darkBackground={false} />
    {#if browser}
        {#await generateCards()}
            <Card title="⏳" description={":( be patient, we are still fetching your stats"} background="#F00" darkBackground={false}/>
        {:then cards}
            {#each cards as card}
                <Card {...card} />
            {/each}
            <Card background="#fff" darkBackground={false} title="😭" description={"That's all the silly stats I could come up with.\nShare a few screenshots in the vail discord if you liked this :)\n\nPing @429ratelimited if you can come up with more card ideas"} />
        {:catch error}
            <Card background="#F00" darkBackground={false} title="💥" description={`Uh oh, seems like something broke and you are the one to blame.\nError: ${JSON.stringify(error.data)}`} />
        {/await}
    {/if}
</div>

<style>
    .cards-container {
        scroll-snap-type: y mandatory;
        height: 100%;
        overflow: scroll;
    }
</style>
