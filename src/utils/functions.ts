import { Like, Repository } from "typeorm";

interface slugRequired {
  slug: string;
}

export const createUniqueSlugFieldFromTitle = async (
  title: string,
  repository: Repository<any>
): Promise<string> => {
  // only use in (Unique: true) fields
  // check and create unique slug field from given "title" parameter
  // repository belonging to Entity should contain "slug" field of type "string"
  let slugField: string;
  slugField = title.toLowerCase().trim().replace(/\s+/g, "-");
  const similarSlugs: slugRequired[] = await repository.find({
    select: { slug: true },
    where: { slug: Like(`${slugField}%`) },
  }); //check similar slug fields
  if (similarSlugs.length > 0) {
    const numberArray = similarSlugs.map((obj) => {
      const subString = obj.slug.substring(slugField.length);
      return Number(subString) ? Number(subString) : 0;
    }); //get the number appended in similar slug fields
    slugField = `${slugField}${Math.max(...numberArray) + 1}`;
  }
  return slugField;
};

/**
 * Executes a provided function once per array element, in order, and
 * constructs a new array from the results.
 * The callback function is invoked with three arguments:
 * the value of the element, the index of the element, and the Array object
 * being traversed.
 * @param array The array to map over
 * @param callbackfn A function that produces an element of the new Array,
 * taking three arguments
 */
export function mapAsync<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => Promise<U>
): Promise<U[]> {
  return Promise.all(array.map(callbackfn));
}

export function generateRandomString(length = 10) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  return Array.from({ length })
    .map(() => {
      return charset.charAt(Math.floor(Math.random() * charset.length));
    })
    .join("");
}
