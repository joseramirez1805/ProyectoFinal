function resolverTorneo(torneo) {
    const [tournamentName, teamsStr, matchesStr] = torneo.split("--").map(part => part.trim());
    const teams = teamsStr.split(",").map(team => team.trim());
    const teamsData = Object.fromEntries(teams.map(team => [team, { points: 0, wins: 0, goalsAgainst: 0 }]));

    matchesStr.split(",").forEach(match => {
        const [team1, goals1Str, goals2Str, team2] = match.split("#").map(part => part.trim());
        const goals1 = parseInt(goals1Str, 10);
        const goals2 = parseInt(goals2Str, 10);

        const team1Data = teamsData[team1];
        const team2Data = teamsData[team2];

        team1Data.goalsAgainst += goals2;
        team2Data.goalsAgainst += goals1;

        if (goals1 > goals2) {
            team1Data.points += 3;
            team1Data.wins += 1;
        } else if (goals1 < goals2) {
            team2Data.points += 3;
            team2Data.wins += 1;
        } else {
            team1Data.points += 1;
            team2Data.points += 1;
        }
    });

    const teamsArray = Object.entries(teamsData).map(([name, data]) => ({ name, ...data }));
    teamsArray.sort((a, b) => {
        if (a.points !== b.points) return b.points - a.points;
        if (a.wins !== b.wins) return b.wins - a.wins;
        if (a.goalsAgainst !== b.goalsAgainst) return a.goalsAgainst - b.goalsAgainst;
        return a.name.localeCompare(b.name);
    });

    return [`Torneo: ${tournamentName}`, ...teamsArray.map((team, i) => 
        `${i + 1}) ${team.name} ${team.points}p, ${team.wins}w, ${team.goalsAgainst}a`
    )].join("\n");
}

export { resolverTorneo };