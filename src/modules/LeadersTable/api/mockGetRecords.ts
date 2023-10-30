import { faker } from "@faker-js/faker";
import { type RecordData } from "@/api/types/index";

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

let userId = 0;
let recordId = 0;

const newRecord = (): RecordData => {
  return {
    createdAt: faker.date.between({ from: "2023-10-01T00:00:00.000Z", to: "2023-10-20T00:00:00.000Z" }).toISOString(),
    updatedAt: faker.date.between({ from: "2023-10-01T00:00:00.000Z", to: "2023-10-20T00:00:00.000Z" }).toISOString(),
    highscore: faker.number.int({ min: 1, max: 44 }),
    average: faker.number.float({ min: 8, max: 14 }),
    totalClicks: faker.number.int({min: 653, max: 12983 }),
    totalResets: faker.number.int({ min: 82, max: 1698 }),
    id: recordId++,
    owner: {
      id: userId++,
      name: faker.internet.userName(),
    },
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): RecordData[] => {
    const len = lens[depth]!;
    return range(len).map((): RecordData => {
      return {
        ...newRecord(),
        // subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

const data = makeData(150);

export async function getRecordsPaginated(options: { page: number; perPage: number }) {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 500));

  return {
    data: data.slice(options.page * options.perPage, (options.page + 1) * options.perPage),
    meta: {
      // page: Math.ceil(data.length / options.perPage),
      page: options.page,
      perPage: options.perPage,
      itemsCount: data.length,
    },
  };
}
