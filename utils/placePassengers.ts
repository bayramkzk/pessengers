type TagData = {
  name: string;
  rate: number;
};

type TagVector = {
  vector: Array<number>;
  rate: number;
};

type UserId = number;
type UserTagsMap = Map<UserId, TagData[]>;
type UserVectorsMap = Map<UserId, TagVector[]>;

type GroupLengthCounts = Map<number, number>;

type Group = Array<number>;
type Placement = Array<Group>;
type Population = Array<Placement>;

function randomCombination<T>(values: Array<T>, size: number): Array<T> {
  return values.sort(() => Math.random() - 0.5).slice(0, size);
}

function randomPlacement(
  userIds: UserId[],
  lengthCounts: GroupLengthCounts
): Placement {
  let currUserIds = userIds.slice();
  return Array.from(lengthCounts.entries()).flatMap(([length, count]) =>
    Array(count)
      .fill([0, 0])
      .map(() => {
        const group = randomCombination(currUserIds, length);
        currUserIds = currUserIds.filter((id) => !group.includes(id));
        return group;
      })
  );
}

function randomPopulation(
  userIds: UserId[],
  lengthCounts: GroupLengthCounts,
  populationSize: number
): Population {
  return Array(populationSize)
    .fill(null)
    .map(() => randomPlacement(userIds, lengthCounts));
}

function sortPopulationByFitness(
  population: Population,
  users: UserVectorsMap
): Population {
  return population.sort(
    (a, b) => fitnessPlacement(b, users) - fitnessPlacement(a, users)
  );
}

function bestPlacementByFitness(
  population: Population,
  users: UserVectorsMap
): Placement {
  const best = population.reduce(
    (best, curr) => {
      const fitness = fitnessPlacement(curr, users);
      if (fitness >= best.bestFitness) {
        return { bestPopulation: curr, bestFitness: fitness };
      }
      return best;
    },
    { bestPopulation: [[]] as Placement, bestFitness: -Infinity }
  );

  return best.bestPopulation;
}

function unflattenPlacement(
  flatPlacement: Group,
  samplePlacement: Placement
): Placement {
  let flatIndex = 0;
  return samplePlacement.map((sampleGroup) => {
    const flatGroup = flatPlacement.slice(
      flatIndex,
      flatIndex + sampleGroup.length
    );
    flatIndex += sampleGroup.length;
    return flatGroup;
  });
}

function crossoverPlacement(father: Placement, mother: Placement): Placement {
  const flatFather = father.flat();
  const flatMother = mother.flat();
  const child = Array(flatFather.length).fill(null);

  for (let i = 0; i < flatFather.length; i++) {
    if (Math.random() < 0.5) {
      child[i] = flatFather[i];
      flatMother.splice(flatMother.indexOf(flatFather[i]), 1);
    }
  }

  for (let i = 0; i < child.length; i++) {
    if (child[i] === null) {
      child[i] = flatMother.splice(0, 1)[0];
    }
  }

  return unflattenPlacement(child, father);
}

function pairCombinations<T>(values: Array<T>): [T, T][] {
  return values.flatMap((value, index) =>
    values.slice(index + 1).map((otherValue) => [value, otherValue] as [T, T])
  );
}

function dotProduct(firstArray: number[], secondArray: number[]): number {
  return firstArray.map((x, i) => x * secondArray[i]).reduce((m, n) => m + n);
}

function normalizeVector(vector: number[]): number {
  return Math.sqrt(vector.reduce((a, b) => a + Math.pow(b, 2), 0));
}

function cosineSimilarity(
  firstVector: number[],
  secondVector: number[]
): number {
  return (
    dotProduct(firstVector, secondVector) /
    (normalizeVector(firstVector) * normalizeVector(secondVector))
  );
}

function fitnessTagVectors([firstVector, secondVector]: TagVector[]): number {
  return (
    cosineSimilarity(firstVector.vector, secondVector.vector) *
    (firstVector.rate * secondVector.rate)
  );
}

function* productIterable<T>(pools: T[][]): IterableIterator<T[]> {
  let i = 0;
  const indexes = new Array(pools.length).fill(0);
  const result = indexes.map((x, i) => pools[i][x]);
  indexes[0] = -1;
  while (i < indexes.length) {
    if (indexes[i] < pools[i].length - 1) {
      indexes[i]++;
      result[i] = pools[i][indexes[i]];
      i = 0;
      yield result.slice();
    } else {
      indexes[i] = 0;
      result[i] = pools[i][0];
      i++;
    }
  }
}

function fitnessPlacement(placement: Placement, users: UserVectorsMap): number {
  return placement
    .map((group) =>
      pairCombinations(group).map((userPair) =>
        Array.from(
          productIterable(userPair.map((userId) => users.get(userId)!))
        ).map(fitnessTagVectors)
      )
    )
    .flat(3)
    .reduce((a, b) => a + b, 0);
}

export function evolvePlacement(
  users: UserVectorsMap,
  lengthCounts: GroupLengthCounts,
  populationSize: number,
  maxIterations: number
): Placement {
  const userIds = Array.from(users.keys());
  let population = randomPopulation(userIds, lengthCounts, populationSize);

  for (let i = 0; i < maxIterations; i++) {
    const newPopulation: Population = [];
    const [father, mother, ...rest] = sortPopulationByFitness(
      population,
      users
    );

    const addition = randomPopulation(
      userIds,
      lengthCounts,
      Math.floor(populationSize / 2)
    );
    Array.prototype.push.apply(population, addition);

    while (newPopulation.length < populationSize) {
      const child = crossoverPlacement(father, mother);
      newPopulation.push(child);
    }

    population = newPopulation;
  }

  const bestPlacement = bestPlacementByFitness(population, users);
  return bestPlacement;
}
