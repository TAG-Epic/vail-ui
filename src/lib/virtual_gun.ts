import type { UserGunStats } from "$lib/api";
export function createCombinationVirtualGun(guns: UserGunStats[]): UserGunStats {
    const virtualGun = {
        kills: {
            headshot_kills: guns.reduce((accumulator, weapon) => {return accumulator + weapon.kills.headshot_kills}, 0),
            total: guns.reduce((accumulator, weapon) => {return accumulator + weapon.kills.total}, 0),
        },
        shots: {
            fired: guns.reduce((accumulator, weapon) => {return accumulator + weapon.shots.fired}, 0),
            hits: {
                head: guns.reduce((accumulator, weapon) => {return accumulator + weapon.shots.hits.head}, 0),
                body: guns.reduce((accumulator, weapon) => {return accumulator + weapon.shots.hits.body}, 0),
                arm: guns.reduce((accumulator, weapon) => {return accumulator + weapon.shots.hits.arm}, 0),
                leg: guns.reduce((accumulator, weapon) => {return accumulator + weapon.shots.hits.leg}, 0),
            },
        }
    };
    return virtualGun;
}
