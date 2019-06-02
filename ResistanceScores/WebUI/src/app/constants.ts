export module Constants {
  export function noOfSpies(teamSize: number): number {
    return NoOfSpies[teamSize]
  }

  const NoOfSpies: { [teamSize: number]: number } = {
    5: 2,
    6: 2,
    7: 3,
    8: 3,
    9: 3,
    10: 4,
    11: 4,
  };
}
