import { keyBy, indexKeyBy } from './helpers';

// 抽取数据中的Item类型，不是数组直接返回对象的类型
export type ArrayInferExtract<T> = T extends Array<infer P> ? P : T;
export type ArrayAlwaysExtract<T> = T extends Array<infer P> ? P : never;
// 抽取 References 中 Object 类型, 如果是数组取数组 Item 类型
export type ReferenceObjectExtract<T> = {
    [key in keyof T]: ArrayInferExtract<T[key]> extends object ? ArrayInferExtract<T[key]> : never;
};
// 收取 References 中所有的属性 Names，如果ArrayInferExtract不是对象，返回 never
export type ReferenceExtractNames<T> = { [key in keyof T]: ArrayInferExtract<T[key]> extends object ? key : never };
export type ReferenceArrayExtractNames<T> = { [key in keyof T]: T[key] extends Array<object> ? key : never };
// 排除 ReferenceExtractNames 抽取 Names 中的 never，只保留是对象的 Names
export type ReferenceExtractAllowNames<T> = {
    [key in ReferenceExtractNames<T>[keyof T]]: ReferenceExtractNames<T>[key];
};
export type ReferenceArrayExtractAllowNames<T> = {
    [key in ReferenceArrayExtractNames<T>[keyof T]]: ReferenceExtractNames<T>[key];
};

/**
 * 根据 ReferenceExtractAllowKeys 抽取出的 Object Keys 组合新的对象
 * @example ReferenceExtractAllowKeys<{
    users: { uid: string; name: string }[];
    info: { id: number; name: string };
    departments: { dept: number }[];
    ids: string[];
    id: string;
  }> => {
      users: "uid" | "name",
      info: "id" | "name",
      departments: "dept"

  }
 */
export type ReferenceExtractAllowKeys<T> = {
    [key in keyof ReferenceExtractAllowNames<T>]?: keyof ReferenceObjectExtract<T>[key];
};
// 只允许 reference 是 Array 的 Keys
export type ReferenceArrayExtractAllowKeys<T> = {
    [key in keyof ReferenceArrayExtractAllowNames<T>]?: keyof ReferenceObjectExtract<T>[key];
};

function getReferenceIdKey<TReferences>(referenceKey: string, idKeys: ReferenceArrayExtractAllowKeys<TReferences>) {
    return '_id';
}

/**
 * Append references to original references
 * @example
 * mergeReferences({departments: [{ _id: '1', name: 'name-1'}]}, {departments: [{ _id: '3', name: 'name-3'}]})
 * mergeReferences({users: [{ uid: '1', name: 'name-1'}]}, {users: [{ uid: '3', name: 'name-3'}]}, { users: "uid" })
 * @param originalReferences original references
 * @param references append references
 * @param idKeys references 's id key, default is '_id'
 *
 * @returns TReferences
 */


/**
 * Build dictionary for references
 * @param references references
 * @param idKeys references 's id key, default is '_id'
 */
export function buildReferencesKeyBy<TReferences>(
    references: Partial<TReferences>,
    idKeys?: Partial<ReferenceArrayExtractAllowKeys<TReferences>>
) {
    const result: { [key in keyof TReferences]?: { [key: string]: ArrayInferExtract<TReferences[key]> } } = {};
    for (const key in references) {
        if (references.hasOwnProperty(key)) {
            const referenceIdKey = getReferenceIdKey<TReferences>(key, idKeys);
            const reference = references[key];
            if (reference instanceof Array) {
                const originalReferenceIdMap = keyBy<ArrayInferExtract<TReferences>>(reference, referenceIdKey);
                (result as any)[key] = originalReferenceIdMap;
            }
        }
    }
    return result;
}
